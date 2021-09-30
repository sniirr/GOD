"use strict";
exports.__esModule = true;
var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;
function isLoggedIn(req, res, next) {
    if (req.cookies.user) {
        var user = jwt.decode(req.cookies.user, JWT_SECRET);
        req.role = user.role || 'public';
        next();
    }
    else {
        console.log('no user');
        res.sendStatus(401);
    }
}
exports["default"] = isLoggedIn;
