var express = require('express');
var router = express.Router();

var userController = require('../Controllers/userController');

// POST request to register new user
router.post('/register', userController.register_post);

// POST request to user login
router.post('/login', userController.login_post);

router.get('/user/getall', userController.getall);

router.post('/changePassword', userController.changePassword);

module.exports = router;
