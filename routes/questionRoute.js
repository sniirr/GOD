"use strict";
exports.__esModule = true;
var isLoggedIn_1 = require("../middlewares/isLoggedIn");
var router = require('express').Router();
var questionCont_1 = require("../controlers/questionCont");
router
    .post('/create', isLoggedIn_1["default"], questionCont_1.createQuestion);
exports["default"] = router;
