"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
var session = require('express-session');
var port = process.env.PORT || 4000;
var path = require('path');
require('dotenv').config();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));
var userRoute_1 = require("./routes/userRoute");
app.use('/user', userRoute_1["default"]);
//passport settings
var PASSPORT_SECRET = process.env.PASSPORT_SECRET;
var passport = require('passport');
app.use(session({ secret: PASSPORT_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./controlers/auth');
app.get('/auth', passport.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/google/callback', passport.authenticate('google', {
    // successRedirect: 'http://localhost:3000/ready',
    failureRedirect: 'http://localhost:3000/fail'
}), function (req, res) { return console.log(req.user); });
app.get('/logout', function (req, res) {
    req.logout();
    res.send({ login: false });
});
app.listen(port, function () { console.log('Server listen on port', port); });
