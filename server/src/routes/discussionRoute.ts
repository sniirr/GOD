import isLoggedIn from '../middlewares/isLoggedIn';
import { getDiscussion, setMessageLike } from '../controlers/discussionCtrl';
const router = require('express').Router();

router
  .post('/get-discussion', isLoggedIn, getDiscussion)
  .post('/like-message', isLoggedIn, setMessageLike);

export default router;
