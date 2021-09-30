const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  last_entered: Date
});

const UserModel = mongoose.model('UserModel',UserSchema)

export default UserModel;