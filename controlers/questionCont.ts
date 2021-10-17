import QuestionModel from '../models/db/QuestionModel';

export async function createQuestion(req, res) {
    try {

        //get question
        const question = req.body;
        
        //get user _id
        // save to user

        const newQuestion = QuestionModel(question);

        if (question.questionId) {
            //update
            console.log('update2...........',question.questionId)
            const response = await newQuestion.updateOne({_id:question.questionId}, question);
            console.log(response)
            res.send(response)
        } else {
            //create new question

            
            const results = await newQuestion.save();
            console.log(results);
            const { _id } = results;

            res.send({ questionId: _id });
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message })
    }
}