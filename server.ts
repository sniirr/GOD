const express = require('express');
const app = express();
const session = require('express-session');

const port: number | string = process.env.PORT || 4000;
const path = require('path');
require('dotenv').config();




app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

import userRoutes from './routes/userRoute';
app.use('/user', userRoutes);

//passport settings
const PASSPORT_SECRET = process.env.PASSPORT_SECRET;
const passport = require('passport');
app.use(session({secret:PASSPORT_SECRET, resave: true,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

require('./controlers/auth')

app.get('/auth', passport.authenticate('google', { scope: ['email', 'profile'] }),);
app.get('/google/callback', passport.authenticate('google', {
    // successRedirect: 'http://localhost:3000/ready',
    failureRedirect: 'http://localhost:3000/fail'
}), (req, res)=>console.log(req.user));
app.get('/logout',(req:any, res:any) => { 
    req.logout();
    res.send({login:false})
})

app.listen(port, () => { console.log('Server listen on port', port) });

