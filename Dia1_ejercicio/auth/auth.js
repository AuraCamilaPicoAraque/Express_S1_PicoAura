// auth.js
const passport = require("../passport/passport.js");

const auth = (req, res, next) => {
    let responseObj = {
        statusCode: 0,
        errorMsg: "",
        data: {}
    };

    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            responseObj.data = info.message;
            responseObj.statusCode = 401;
            responseObj.errorMsg = "¡El usuario no está autenticado!";
            return res.status(responseObj.statusCode).json(responseObj);
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = auth;