
const router = require('express').Router();

import { login, secret } from '../controlers/userCont';

router
    .post('/login', login)
    .get('/get_secret', isLoggedIn, secret);

export default router;

function isLoggedIn(req, res, next) {
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        console.log('no user');
        res.sendStatus(401);
    }
}