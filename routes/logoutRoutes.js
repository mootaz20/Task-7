const express = require('express');
const authMiddlware = require('../Middlwares/auth');
const logoutControllers = require('../Controllers/logoutControllers')
const logoutRoutes = express.Router();

logoutRoutes.route('/')
            .post(authMiddlware,logoutControllers.logout);

module.exports = logoutRoutes;