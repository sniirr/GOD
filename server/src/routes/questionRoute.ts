import isLoggedIn from '../middlewares/isLoggedIn';
import {
  activateQuestion,
  addSolution,
  upsertQuestion,
  getAllQuestions,
  setSolutionLike,
  voteForSolution,
  getQuestionVotes,
  getQuestionById,
  addMembers,
} from '../controlers/questionCtrl';
const router = require('express').Router();

router
  .post('/upsert', isLoggedIn, upsertQuestion)
  .post('/activate', isLoggedIn, activateQuestion)
  .post('/get-by-id', isLoggedIn, getQuestionById)
  .post('/get-all', isLoggedIn, getAllQuestions)
  .post('/get-votes', isLoggedIn, getQuestionVotes)
  .post('/add-solution', isLoggedIn, addSolution)
  .post('/like-solution', isLoggedIn, setSolutionLike)
  .post('/vote', isLoggedIn, voteForSolution)
  .post('/add-members', isLoggedIn, addMembers);

export default router;
