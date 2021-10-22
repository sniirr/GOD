import { QuestionSchema } from '../models/db/QuestionModel';
var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');

const Question = mongoose.model('Question', QuestionSchema);

export async function createQuestion(req: any, res: any) {
    try {

        //get question
        const question = req.body;
        question.creatorId = req.user.id;




        if (question.questionId) {
            //update

            const response = await Question.find({ _id: new ObjectId(question.questionId) });

            res.send({ update: true, response })

        } else {
            //create new question
            question.active = false;
            const results = await Question.create(question);


            const { _id } = results;

            res.send({ questionId: _id });
        }


    } catch (error) {
        console.error(error)
        res.status(500).send({ error: error.message })
    }
}

export async function activateQuestion(req: any, res: any): Promise<void> {
    try {
        const { active, questionId } = req.body;
        if (typeof active === 'boolean' && typeof questionId === 'string') {
            const result = await Question.updateOne({ _id: new ObjectId(questionId) }, { active })
            res.send({result, ok:true});
        } else {
            throw new Error(`Active should be bollean but was ${typeof active}`);
        }

    } catch (error) {
        res.send({ error: error.message });
    }


}