const mongoose = require("mongoose");
import { UserSchema } from "./UserModel";


// Define a schema
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const STATUSES = ['draft', 'pending', 'active', 'suggestions', 'vote', 'closed', 'deleted']

const FileSchema = new Schema({
  fileName: String,
  fileUrl: String,
});

const ConfigScheme = new Schema({
  maxForVotes: Number,
  maxAgainstVotes: Number,
}, { _id: false })

export const QuestionSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  schedule:{ type: Object, default: {} },
  files: [FileSchema],
  members: [{ type: ObjectId, ref: "User", index: true }],
  creatorId: { type: String, required: true },
  admins: [UserSchema],
  image: Map,
  status: { type: String, enum: STATUSES, default: 'draft' },
  solutions: [{ type: ObjectId, ref: "Solution" }],
  votes: { type: Object, default: {} },
  config: { type: ConfigScheme, default: { maxForVotes: 1, maxAgainstVotes: 1 } }
});

export const Question = mongoose.model("Question", QuestionSchema);

export default Question;
