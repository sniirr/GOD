"use strict";
exports.__esModule = true;
var isLoggedIn_1 = require("../middlewares/isLoggedIn");
var router = require('express').Router();
var userCont_1 = require("../controlers/userCont");
router
    .post('/login', userCont_1.login)
    .get('/get-user', isLoggedIn_1["default"], userCont_1.getUser)
    .get('/get_secret', isLoggedIn_1["default"], userCont_1.secret);
exports["default"] = router;
