import Question from '../models/db/QuestionModel';
import User from "../models/db/UserModel";

var ObjectId = require('mongoose').Types.ObjectId;

export async function createQuestion(req: any, res: any) {
    try {

        //get question
        const question = req.body;

        question.creatorId = req.user.id;
        question.members = [req.user.id]

        if (question.questionId) {
            //update

            const response = await Question.findOneAndUpdate({_id: new ObjectId(question.questionId)}, question);

            res.send({update: true, response})

        } else {
            //create new question
            question.active = false;
            const results = await Question.create(question);


            const {_id} = results;

            res.send({questionId: _id, results});
        }


    } catch (error: any) {
        console.error(error)
        res.status(500).send({error: error.message})
    }
}

export async function activateQuestion(req: any, res: any): Promise<void> {
    try {
        const {activate, questionId} = req.body;
        if (typeof activate === 'boolean' && typeof questionId === 'string') {
            const result = await Question.updateOne({_id: new ObjectId(questionId)}, {activate})
            res.send({result, ok: true});
        } else {
            throw new Error(`activate should be bollean but was ${typeof activate}`);
        }

    } catch (error: any) {
        res.send({error: error.message});
    }


}

export async function getAllQuestions(req: any, res: any): Promise<void> {
    try {

        if (!{}.hasOwnProperty.call(req, 'user')) throw new Error('No user in request')
        const userId = req.user.id;

        const result = await Question.find({
            members: userId
        });

        for (let i in result) {


            result[i].members = [req.user.id]

            result[i].admins = [];
        }

        res.send({result, ok: true});
    } catch (error: any) {
        res.send({error: error.message});
    }
}

export async function addSolution(req: any, res: any) {
    try {
        const user = await User.findOne({id: req.user.id});

        const solution = {
            ...req.body,
            date: new Date(),
            roles: {
                creator: user,
            }
        }

        const question = await Question.findOne({_id: new ObjectId(req.body.parentId)})
        question.solutions.push(solution)
        await question.save()

        res.send(solution);
    } catch (error: any) {
        console.error(error)
        res.status(500).send({error: error.message})
    }
}
