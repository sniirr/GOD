import QuestionModel from '../models/db/QuestionModel';

export function createQuestion(req, res){
    try {

        //save to db
        QuestionModel.save({})
        //get question
        console.log(req.body)

        res.send({data:true});
    } catch (error) {
        console.log(error)
        res.status(500).send({error:error.message})
    }
}