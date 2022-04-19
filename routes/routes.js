const express = require('express');
const router = express.Router();
const {login} = require('../controllers/requests');

router.route('/').get(login)

module.exports = router;