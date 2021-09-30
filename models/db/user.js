"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    last_entered: Date
});
var UserModel = mongoose.model('UserModel', UserSchema);
exports["default"] = UserModel;
