import Question from '../models/QuestionModel';
import User from '../models/UserModel';
import Solution from '../models/SuggestionModel';
import _, { get, omit, reduce, isEmpty } from 'lodash'

const ObjectId = require('mongoose').Types.ObjectId;

export async function upsertQuestion(req: any, res: any) {
  try {
    const question = req.body;
    const creatorId = req.user._id

    if (question._id) {
      // update
      const response = await Question.findOneAndUpdate({ _id: new ObjectId(question._id) }, question);
      res.send({ update: true, response });
    } else {
      const user = await User.findById(creatorId)
      // create new question
      question.creatorId = creatorId;
      question.members = [user];
      const result = await Question.create(question);
      res.send(result);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export async function activateQuestion(req: any, res: any): Promise<void> {
  try {
    const { questionId } = req.body;
    if (typeof questionId === 'string') {
      const result = await Question.updateOne({ _id: new ObjectId(questionId) }, { status: 'active' });
      res.send({ result, ok: true });
    } else {
      res.send({ error: `Error updating question ${questionId}` });
    }
  } catch (error: any) {
    res.send({ error: error.message });
  }
}

export async function getAllQuestions(req: any, res: any): Promise<void> {
  try {
    if (!{}.hasOwnProperty.call(req, 'user')) throw new Error('No user in request');
    const userId = req.user._id;

    const questions = await Question.find({
      members: new ObjectId(userId),
    })
      .populate('members')
      .populate('solutions');

    res.send(questions);
  } catch (error: any) {
    res.send({ error: error.message });
  }
}

export async function getQuestionById(req: any, res: any): Promise<void> {
  try {
    const { qid } = req.body;

    res.send(await Question.findById(qid));
  } catch (error: any) {
    res.send({ error: error.message });
  }
}

export async function getQuestionVotes(req: any, res: any): Promise<void> {
  try {
    const { qid } = req.body
    const question = await Question.findById(qid)

    const counters = _.reduce(question.votes, (counters, userVotes) => {
      _.forEach(userVotes, (value, sid) => {
        const i = value === -1 ? 0 : 1
        counters[sid].total += value
        counters[sid].options[i]++
      })
      return counters
    }, _.zipObject(question.solutions, _.map(question.solutions, () => ({
      total: 0,
      options: [0, 0],
    }))))

    res.send(omit(counters, null));
  } catch (error: any) {
    res.send({ error: error.message });
  }
}

export async function addMembers(req: any, res: any) {
  try {
    const { qid, emails } = req.body

    /*
      TODO:
       - notify existing users
       - send invite email to new users
     */
    const question = await Question.findOne({ _id: new ObjectId(qid) }).populate('members');
    const questionMemberEmails = question.members.map(m => m.email)
    const newMembers = await User.find({ email: { $in: emails, $nin: questionMemberEmails } });
    console.log('ADDING MEMBERS', { emails, questionMemberEmails, newMembers })

    const updatedQuestion = await Question.findOneAndUpdate({ _id: new ObjectId(qid) }, {
      $push: {
        members: { $each: newMembers },
      }
    })

    res.send(updatedQuestion.members);
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export async function addSolution(req: any, res: any) {
  try {
    const user = await User.findById(req.user._id);

    const solutionData = {
      ...req.body,
      date: new Date(),
      creator: user,
    };

    const solution = await Solution.create(solutionData);

    const question = await Question.findOne({ _id: new ObjectId(req.body.parentId) });
    question.solutions.push(solution._id);
    await question.save();

    res.send(solution);
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export const setSolutionLike = async (req: any, res: any) => {
  try {
    const { sid, vote } = req.body;
    const { _id: userId } = req.user;

    const key = `likes.${userId}`;

    const solution = await Solution.findById(sid)
    const userVote = solution.likes.get(userId)
    const resolvedVote = vote === userVote ? null : vote

    await Solution.updateOne(
      { _id: sid },
      {
        $set: {
          [key]: resolvedVote,
        },
      },
    );

    res.send({ resolvedVote });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const voteForSolution = async (req: any, res: any) => {
  try {
    const { qid, sid, value } = req.body;
    const { _id: userId } = req.user;

    const key = `votes.${userId}`;
    const question = await Question.findById(qid)
    let userVote = get(question.votes, userId, {})

    if (get(userVote, sid) === value) {
      userVote = _.omit(userVote, sid)
    }
    else {
      const currValueVote = reduce(userVote, (vote, _value, _sid) => {
        if (!isEmpty(vote)) return vote
        return _value === value ? _sid : ''
      }, '')
      if (!isEmpty(currValueVote) && currValueVote !== sid) {
        userVote = _.omit(userVote, currValueVote)
      }
      userVote[sid] = value
    }

    await Question.updateOne(
      { _id: qid },
      {
        $set: {
          [key]: userVote,
        },
      },
    );

    res.send({ resolvedVote: userVote });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}