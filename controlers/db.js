"use strict";
exports.__esModule = true;
exports.db = void 0;
var a = 0;
console.log(a);
//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
//local:
// const mongoDB = 'mongodb://127.0.0.1/my_database'; 
//atlas:
var mongoDB = 'mongodb+srv://tal1:9jNgEw4y7l9wjkkI@tal-test1.m39if.mongodb.net/global_online?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
//Get the default connection
exports.db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
exports.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
