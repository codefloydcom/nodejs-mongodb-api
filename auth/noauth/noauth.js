// Dummy file to run node without security

const asyncHandler = require('../../middleware/async');


// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {  req.user = {id :'111111111111111111111111'}; next(); } );

exports.authorize = (...roles) =>  (req, res, next) => next();