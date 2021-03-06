const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.post('/signup', usersController.addUser);

router.post('/login', usersController.login);

router.post('/reset', usersController.reset);

router.post('/reset-password', usersController.postNewPassword);


module.exports = router;
