const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  displayName: String,
  name: { givenName: String, familyName: String },
  email_verified: Boolean,
  language: String,
  locale: String,
  email: String,
  picture: String,
  last_entered: Date,
});

export const User = mongoose.model('User', UserSchema);

export default User;
