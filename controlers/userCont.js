"use strict";
exports.__esModule = true;
exports.secret = exports.getUser = exports.login = void 0;
var userSchema_1 = require("../models/userSchema");
function login(req, res) {
    try {
        var _a = req.body, username = _a.username, password = _a.password;
        var valid = (0, userSchema_1.userValidate)({ username: username, password: password });
        if (!valid) {
            console.log(userSchema_1.userValidate.errors);
            throw new Error('Validation Error');
        }
        res.send({ username: username, password: password });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}
exports.login = login;
function getUser(req, res) {
    try {
        var user = req.user;
        res.send({ user: user });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}
exports.getUser = getUser;
function secret(req, res) {
    try {
        res.send({ secret: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}
exports.secret = secret;
