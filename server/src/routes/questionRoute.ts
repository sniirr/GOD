import isLoggedIn from '../middlewares/isLoggedIn';

const router = require('express').Router();

import {activateQuestion, addSolution, createQuestion, getAllQuestions, setSolutionLike} from '../controlers/questionCont';

router
    .post('/create',isLoggedIn, createQuestion)
    .post('/activate', isLoggedIn, activateQuestion)
    .post('/get-all', isLoggedIn, getAllQuestions)
    .post('/add-solution', isLoggedIn, addSolution)
    .post('/like-solution', isLoggedIn, setSolutionLike)

export default router;