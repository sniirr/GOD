"use strict";
exports.__esModule = true;
var router = require('express').Router();
var userCont_1 = require("../controlers/userCont");
router.post('/login', function (req, res, next) { console.log('next'); next(); }, userCont_1.login);
exports["default"] = router;
