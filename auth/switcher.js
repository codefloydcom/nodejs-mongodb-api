exports.authMiddleware = () => {
    let auth; 

    if( process.env.AUTH_TYPE ==='JWT') {
        auth = require('../auth/jwt/middleware/auth');
    } 
    else if( process.env.AUTH_TYPE ==='NOAUTH') {
        auth = require('../auth/noauth/noauth');
    }

    else if( process.env.AUTH_TYPE ==='AUTH0') {
        auth = require('../auth/auth0/auth');
    }

    else if( process.env.AUTH_TYPE ==='AZURE') {
        auth = require('../auth/azure/auth');
    }

    return auth;
};

exports.authRouter = (app) => {
    let auth;

    if( process.env.AUTH_TYPE==='JWT') {
        auth = require('../auth/jwt/routers/auth');
    }

    return auth;
}