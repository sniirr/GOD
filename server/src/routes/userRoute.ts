import isLoggedIn from '../middlewares/isLoggedIn';
import { login, secret, getUser, searchUsersByEmail } from '../controlers/userCtrl';
const router = require('express').Router();

router
  .post('/login', login)
  .get('/get-user', isLoggedIn, getUser)
  .get('/get_secret', isLoggedIn, secret)
  .post('/search', isLoggedIn, searchUsersByEmail);

export default router;
