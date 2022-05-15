const mongoose = require('mongoose');

const Schema = mongoose.Schema;

export const MessageSchema = new Schema({
  id: String,
  text: String,
  parentId: String, // question id
  parentType: String, // "question"
  // direction:String, //is it rtl or ltr
  // language: String, //hebrew, arabic, english, etc
  image: String,
  date: Date,
  likes: { type: Map, of: Boolean, default: new Map() },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Message = mongoose.model('Message', MessageSchema)
