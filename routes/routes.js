const express = require('express');
const app = express();
const router = express.Router();
const {loginGet, loginPost} = require('../controllers/login-requests');
const {signUpGet, signUpPost} = require('../controllers/signUp-requests');
const tools = require('../controllers/tools-requests');
const {homeGet, addItem, editItem, deleteItem, signOut} = require('../controllers/home-requests');

router.route('/').get(loginGet).post(loginPost);
router.route('/sign-up').get(signUpGet).post(signUpPost);
router.route('/tools').get(tools)
router.route('/home').get(homeGet).post(addItem).patch(editItem).delete(deleteItem);
router.route('/sign-out').get(signOut);

module.exports = router;