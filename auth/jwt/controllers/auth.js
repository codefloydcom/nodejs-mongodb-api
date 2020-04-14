const ErrorResponse = require('../../../extensions/errorRespose');
const asyncHandler = require('../../../middleware/async');
const User = require('../models/user');
const crypto = require('crypto');

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


// @desc        Get current user
// @route       POST /api/auth/me
// @access      Private
exports.getMe = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({ success : true, user });
});

// @desc        Logout user
// @route       get /api/auth/logout
// @access      Private
exports.logout = asyncHandler(async(req, res, next) => {
    res.cookie('token', 'none', {
        expires : new Date(Date.now() + 10 * 1000),
        httpOnly : true
    });

    res.status(200).json({ success : true, data: {} });
});


// @desc        Get current user
// @route       POST /api/auth/forgotpassword
// @access      Public
exports.forgotPassword = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorResponse('No user with given email', 400));
    }

    const resetToken = user.getResetPasswordToken();

    const resetUrl = `${req.protocol}://${req.get('host')}/api/resetpassword/${resetToken}`;

    await user.save({ validateBeforeSave : false });
    
    res.status(200).json({ success : true, resetLink : resetUrl });
});

// @desc        Reset password
// @route       POST /api/auth/resetpassword/:resettoken
// @access      Public
exports.resetPassword = asyncHandler(async(req, res, next) => {
    // Get hashed token
    const resetPassword = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

    const user = await User.findOne({ 
        resetPasswordToken : resetPassword,
        resetPasswordExpire : { $gt: Date.now() }
    });

    if(!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    // Set a new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

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