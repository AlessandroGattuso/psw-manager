const express = require('express');
const app = express();
const router = express.Router();
const {loginGet, loginPost} = require('../controllers/login-requests');
const {signUpGet, signUpPost} = require('../controllers/signUp-requests');
const {homeGet, signOut} = require('../controllers/home-requests');
const {editGet} = require('../controllers/edit-requests');

router.route('/').get(loginGet).post(loginPost);
router.route('/sign-up').get(signUpGet).post(signUpPost);
router.route('/home').get(homeGet);
router.route('/sign-out').get(signOut);
router.route('/edit').get(editGet);

module.exports = router;