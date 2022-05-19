const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  id: String,
  displayName: String,
  name: { givenName: String, familyName: String },
  email_verified: Boolean,
  language: String,
  locale: String,
  email: String,
  picture: String,
  last_entered: Date,
  organizations: [{ type: Schema.Types.ObjectId, ref: "Organization"}]
});

export const User = mongoose.model('User', UserSchema);

export default User;
