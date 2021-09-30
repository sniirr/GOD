"use strict";
exports.__esModule = true;
var router = require('express').Router();
var userCont_1 = require("../controlers/userCont");
router
    .post('/login', userCont_1.login)
    .get('/get_secret', isLoggedIn, userCont_1.secret);
exports["default"] = router;
function isLoggedIn(req, res, next) {
    if (req.user) {
        console.log(req.user);
        next();
    }
    else {
        console.log('no user');
        res.sendStatus(401);
    }
}
