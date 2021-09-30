"use strict";
exports.__esModule = true;
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var jwt = require('jwt-simple');
var app = express();
app.use(cookieParser());
var port = process.env.PORT || 4000;
var path = require('path');
require('dotenv').config();
var JWT_SECRET = process.env.JWT_SECRET;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));
var userRoute_1 = require("./routes/userRoute");
app.use('/user', userRoute_1["default"]);
//passport settings
var PASSPORT_SECRET = process.env.PASSPORT_SECRET;
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: PASSPORT_SECRET, resave: false, saveUninitialized: false }));
require('./controlers/auth');
app.get('/auth', passport.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/google/callback', passport.authenticate('google', {
    // successRedirect: 'http://localhost:3000/ready',
    failureRedirect: 'http://localhost:3000/fail'
}), function (req, res) {
    var user = req.user;
    user.role = 'public';
    var userJWT = jwt.encode(user, JWT_SECRET);
    res.cookie('user', userJWT, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 2 });
    res.redirect('http://localhost:3000/ready');
});
app.get('/logout', function (req, res) {
    req.logout();
    res.clearCookie("user");
    res.send({ login: false });
});
app.listen(port, function () { console.log('Server listen on port', port); });
