import isLoggedIn from '../middlewares/isLoggedIn';

const router = require('express').Router();

import { activateQuestion, createQuestion } from '../controlers/questionCont';

router
    .post('/create',isLoggedIn, createQuestion)
    .post('/activate', isLoggedIn, activateQuestion);
    

export default router;