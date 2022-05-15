import isLoggedIn from '../middlewares/isLoggedIn';

const router = require('express').Router();

import { getDiscussion, setMessageLike } from '../controlers/discussionCont';

router
  .post('/get-discussion', isLoggedIn, getDiscussion)
  .post('/like-message', isLoggedIn, setMessageLike);

export default router;
