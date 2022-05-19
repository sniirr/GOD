import isLoggedIn from '../middlewares/isLoggedIn';
import { login, secret, getUser } from '../controlers/userCtrl';
const router = require('express').Router();

router
  .post('/login', login)
  .get('/get-user', isLoggedIn, getUser)
  .get('/get_secret', isLoggedIn, secret);

export default router;
