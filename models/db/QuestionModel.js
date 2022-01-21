"use strict";
exports.__esModule = true;
exports.QuestionSchema = void 0;
var mongoose = require('mongoose');
var UserModel_1 = require("./UserModel");
//Define a schema
var Schema = mongoose.Schema;
var FileSchema = new Schema({
    fileName: String,
    fileUrl: String
});
exports.QuestionSchema = new Schema({
    title: String,
    description: String,
    files: [FileSchema],
    coverImage: String,
    members: { type: [String], index: true },
    creatorId: String,
    admins: [UserModel_1.UserSchema],
    last_entered: Date,
    role: String,
    image: Map,
    active: Boolean,
    draft: Boolean,
    status: {
        draft: Boolean,
        active: Boolean,
        suggestions: Boolean,
        vote: Boolean,
        closed: Boolean,
        deleted: Boolean
    }
});
var QuestionModel = mongoose.model('QuestionModel', exports.QuestionSchema);
exports["default"] = QuestionModel;
