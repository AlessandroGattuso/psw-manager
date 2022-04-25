const express = require('express');
const router = express.Router();
const login = require('../controllers/login-requests');
const {signUpGet, signUpPost} = require('../controllers/signUp-requests');

router.route('/').get(login);
router.route('/sign-up').get(signUpGet).post(signUpPost);

module.exports = router;