export function createQuestion(req, res){
    try {
        res.send({data:true});
    } catch (error) {
        console.log(error)
        res.status(500).send({error:error.message})
    }
}