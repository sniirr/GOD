"use strict";
exports.__esModule = true;
exports.login = void 0;
var userSchema_1 = require("../models/userSchema");
function login(req, res) {
    try {
        var _a = req.body, username = _a.username, password = _a.password;
        var valid = userSchema_1.userValidate({ username: username, password: password });
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
