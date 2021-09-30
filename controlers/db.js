"use strict";
exports.__esModule = true;
exports.db = void 0;
//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
//Get the default connection
exports.db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
exports.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
