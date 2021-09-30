const mongoose = require('mongoose');
import UserModel from './UserModel';
//Define a schema
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    fileName: String,
    fileUrl:String
});


const QuestionSchema = new Schema({
    name: String,
    description: String,
    files: [FileSchema],
    coverImage: String,
    members:[UserModel],
    creators:[UserModel],
    admins:[UserModel],
    last_entered: Date,
    role:String,
});

const QuestionModel = mongoose.model('UserModel', QuestionSchema);

export default QuestionModel;