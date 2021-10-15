"use strict";
exports.__esModule = true;
exports.createQuestion = void 0;
var QuestionModel_1 = require("../models/db/QuestionModel");
function createQuestion(req, res) {
    try {
        //save to db
        QuestionModel_1["default"].save({});
        //get question
        console.log(req.body);
        res.send({ data: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
}
exports.createQuestion = createQuestion;
