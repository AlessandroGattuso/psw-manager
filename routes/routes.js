const express = require('express');
const router = express.Router();
const {login} = require('../controllers/login-requests');
const {signUpGet} = require('../controllers/signUp-requests');

router.route('/sign-up').get(signUpGet)
router.route('/').get(login)

module.exports = router;