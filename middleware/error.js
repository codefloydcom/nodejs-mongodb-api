const ErrorResponse = require('../extensions/errorRespose');

const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;

    //console.log(err);
    
    // jwt-express error handle if token wrong
    if(err.name === 'UnauthorizedError') {
        const message = 'Not authorize to access this route';
        error = new ErrorResponse(message, 401);
    }

    // Error in object id 
    if(err.name === 'CastError') {
        const message = `Item wasn't found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // dublicate value
    if(err.code === 11000) {
        const message = 'Dublicate field value entered';
        error = new ErrorResponse(message, 400);
    }

     // Custom DB errors from validators extractor
     if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(v => v.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.StatusCode || 400)
            .json({success: false, error: error.message || 'Some error' });
}

module.exports = errorHandler;