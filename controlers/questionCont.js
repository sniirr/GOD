"use strict";
exports.__esModule = true;
exports.createQuestion = void 0;
function createQuestion(req, res) {
    try {
        res.send({ data: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}
exports.createQuestion = createQuestion;
