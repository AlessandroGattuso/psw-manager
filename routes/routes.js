const express = require('express');
const app = express();
const router = express.Router();
const {loginGet, loginPost} = require('../controllers/login-requests');
const {signUpGet, signUpPost} = require('../controllers/signUp-requests');
const {homeGet, addItem, editItem, signOut} = require('../controllers/home-requests');

router.route('/').get(loginGet).post(loginPost);
router.route('/sign-up').get(signUpGet).post(signUpPost);
router.route('/home').get(homeGet).post(addItem).patch(editItem);
router.route('/sign-out').get(signOut);

module.exports = router;