const mongoose = require('mongoose');
import {UserSchema} from './UserModel';


//Define a schema
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    fileName: String,
    fileUrl:String
});

const Image = new Schema({
    title: String,
    description: String,
    // image:String
})


export const QuestionSchema = new Schema({
    title: String,
    description: String,
    files: [FileSchema],
    coverImage: String,
    members:[UserSchema],
    creatorId:String,
    admins:[UserSchema],
    last_entered: Date,
    role:String,
    image:Map,
    active:Boolean
});

const QuestionModel = mongoose.model('QuestionModel', QuestionSchema);

export default QuestionModel;