const ErrorResponse = require('../../../extensions/errorRespose');
const asyncHandler = require('../../../middleware/async');
const User = require('../models/user');

// @desc        Register user
// @route       POST /api/auth/register
// @access      Public
exports.register = asyncHandler(async(req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name, email, password, role
    });

    sendTokenResponse(user, 200, res);
});

// @desc        Login user
// @route       POST /api/auth/login
// @access      Public
exports.login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
});

// Cookie builder
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const cookieOptions = {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
        httpOnly : true
    };

    if(process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }

    res.status(statusCode)
            .cookie('token', token, cookieOptions)
            .json({ success: true, token });
}

// @desc        Get current user
// @route       POST /api/auth/me
// @access      Private
exports.getMe = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({ success : true, user });
});