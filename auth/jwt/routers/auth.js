const express = require('express');
const { register, login, getMe, forgotPassword, resetPassword, logout } = require('../controllers/auth');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').post(protect, getMe);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resettoken').post(resetPassword);
router.route('/logout').get(logout);


module.exports = router;