const mongoose = require("mongoose");
import { UserSchema } from "./UserModel";

// Define a schema
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const FileSchema = new Schema({
  fileName: String,
  fileUrl: String,
});

export const QuestionSchema = new Schema({
  orgId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  schedule:{ type: Object, default: {} },
  files: [FileSchema],
  members: { type: [String], index: true },
  creatorId: { type: String, required: true },
  admins: [UserSchema],
  last_entered: Date,
  role: String,
  image: Map,
  status: {
    type: String,
    enum: ['draft', 'pending', 'active', 'suggestions', 'vote', 'closed', 'deleted'],
    default: 'draft',
  },
  solutions: [{ type: ObjectId, ref: "Solution" }],
  watchlist: { type: Object, default: {} },
  votes: { type: Map, of: String, default: new Map() },
});

export const Question = mongoose.model("Question", QuestionSchema);

export default Question;
