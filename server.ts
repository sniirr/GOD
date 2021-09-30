const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const jwt = require('jwt-simple');


const app = express();

app.use(cookieParser());

const port: number | string = process.env.PORT || 4000;
const path = require('path');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

import userRoutes from './routes/userRoute';
app.use('/user', userRoutes);

//passport settings
const PASSPORT_SECRET = process.env.PASSPORT_SECRET;
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: PASSPORT_SECRET, resave: false, saveUninitialized: false }));

require('./controlers/auth')

app.get('/auth', passport.authenticate('google', { scope: ['email', 'profile'] }),);
app.get('/google/callback', passport.authenticate('google', {
    // successRedirect: 'http://localhost:3000/ready',
    failureRedirect: 'http://localhost:3000/fail'
}), (req, res) =>{
      
    const user = req.user;
    user.role = 'public';
    const userJWT = jwt.encode(user, JWT_SECRET)
    res.cookie('user', userJWT, {httpOnly:true, maxAge:1000*60*60*24*2})
    res.redirect('http://localhost:3000/ready')
});




app.get('/logout', (req: any, res: any) => {
    req.logout();
    res.clearCookie("user");
    res.send({ login: false })
})

app.listen(port, () => { console.log('Server listen on port', port) });

