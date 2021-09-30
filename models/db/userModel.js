"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    id: String,
    displayName: String,
    name: { givenName: String, familyName: String },
    email_verified: Boolean,
    language: String,
    locale: String,
    email: String,
    picture: String,
    last_entered: Date
});
var UserModel = mongoose.model('UserModel', UserSchema);
exports["default"] = UserModel;
