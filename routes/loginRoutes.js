const express = require('express');
const loginControllers = require('../Controllers/loginControllers');
const loginRoutes = express.Router();


loginRoutes.route('/')
           .post(loginControllers.login);

module.exports = loginRoutes;