const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

exports.protect = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWT_AZURE_JWKS
    }),
    audience: process.env.JWT_AZURE_AUD, //{clientId}
    issuer: process.env.JWT_AZURE_ISS, //https://sts.windows.net/{tenandId}/
    algorithms: ['RS256']
});

// req.user to access custom claims
exports.authorize = (...roles) =>  (req, res, next) => { 
    console.log(req.user.upn);
    next();
}