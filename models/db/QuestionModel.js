"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var UserModel_1 = require("./UserModel");
//Define a schema
var Schema = mongoose.Schema;
var FileSchema = new Schema({
    fileName: String,
    fileUrl: String
});
var Image = new Schema({
    title: String,
    description: String
});
var QuestionSchema = new Schema({
    title: String,
    description: String,
    files: [FileSchema],
    coverImage: String,
    members: [UserModel_1["default"]],
    creators: [UserModel_1["default"]],
    admins: [UserModel_1["default"]],
    last_entered: Date,
    role: String
});
var QuestionModel = mongoose.model('QuestionModel', QuestionSchema);
exports["default"] = QuestionModel;
