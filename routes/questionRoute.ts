import isLoggedIn from '../middlewares/isLoggedIn';

const router = require('express').Router();

import { createQuestion } from '../controlers/questionCont';

router
    .post('/create',isLoggedIn, createQuestion);
    

export default router;