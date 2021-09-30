const jwt = require('jwt-simple');
const JWT_SECRET = process.env.JWT_SECRET;

function isLoggedIn(req, res, next) {

 
    if (req.cookies.user) {
        const user = jwt.decode(req.cookies.user, JWT_SECRET);
     
        req.role = user.role || 'public';
        next();
    } else {
        console.log('no user');
        res.sendStatus(401);
    }
}

export default isLoggedIn;