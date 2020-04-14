const jwt = require('express-jwt');
const jwks = require('jwks-rsa');


exports.protect  = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWT_AUTH0_JWKS
    }),
    audience: process.env.JWT_AUTH0_AUD,
    issuer: process.env.JWT_AUTH0_ISS,
    algorithms: ['RS256']
});

// req.user to access custom claims
exports.authorize = (...roles) =>  (req, res, next) => next();