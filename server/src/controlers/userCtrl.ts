import { userValidate } from '../models/userValidation';
import User from "../models/UserModel";
import Question from "../models/QuestionModel";

export function login(req: any, res: any): void {
  try {
    const { username, password } = req.body;

    const valid = userValidate({ username, password });
    if (!valid) {
      console.log(userValidate.errors);
      throw new Error('Validation Error');
    }

    res.send({ username, password });
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function getUser(req: any, res: any) {
  try {
    const user = await User.findOne({ _id: req.user._id })

    res.send(user);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export const searchUsersByEmail = async (req: any, res: any) => {
  try {
    const { term, opts = {} } = req.body
    const { qid } = opts
    const question = await Question.findById(qid).populate('members')
    const questionMemberEmails = question.members.map(m => m.email)
    console.log(`Searching users by email`, { qid, question, term, questionMemberEmails})
    const users = await User.find({ email: { $regex: term, $nin: questionMemberEmails } }).select('email')

    res.send(users.map(({ email }) => email));
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export function secret(req: any, res: any): void {
  try {
    res.send({ secret: true });
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
}
