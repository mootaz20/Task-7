const express = require('express');
const registerRoutes = express.Router();
const registerControllers = require('../Controllers/registerControllers');

registerRoutes.route('/')
            .post(registerControllers.register)

module.exports = registerRoutes;