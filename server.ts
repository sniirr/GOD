const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const jwt = require('jwt-simple');
const mongoose = require('mongoose');


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
import questionRoutes from './routes/questionRoute';
app.use('/questions', questionRoutes);

//passport settings
const PASSPORT_SECRET = process.env.PASSPORT_SECRET;
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: PASSPORT_SECRET, resave: false, saveUninitialized: false }));

require('./controlers/auth')// get google authentication
require('./controlers/db') //connect to mongoDB

import { UserSchema } from './models/db/userModel';

app.get('/auth', passport.authenticate('google', { scope: ['email', 'profile'] }),);
app.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/fail'
}), async (req, res) => {
    try {
        const user = req.user;

        user.role = 'public';
        user.last_entered = new Date();
        console.log(`user ${user.displayName} logged in`);
        const userJWT = jwt.encode({ id: user.id }, JWT_SECRET);

        const UserModel = mongoose.model('UserModel', UserSchema)

        // Try to update user
        const userDB = await UserModel.findOneAndUpdate({ id: user.id }, user);

        if (!userDB) {
            const newUser = new UserModel(user);
            const userData = await newUser.save();
            console.log(userData);
        }

        res.cookie('user', userJWT, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 2 })
        res.redirect('http://localhost:3000/vote')
    } catch (err) {
        res.status(500).send(err.message);
    }
});




app.get('/logout', (req: any, res: any) => {
    req.logout();
    res.clearCookie("user");
    res.send({ login: false })
})

app.listen(port, () => { console.log('Server listen on port', port) });

