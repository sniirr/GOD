const router = require('express').Router();

import {login} from '../controlers/userCont';

router.post('/login',(req, res, next)=>{console.log('next'); next()}, login)

export default router;