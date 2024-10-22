const express = require('express');
const commentsControllers = require('../Controllers/commentsControllers');
const authMiddlware = require('../Middlwares/auth');
const checkComments = require('../Middlwares/checkComments');
const commentsRoutes = express.Router();

commentsRoutes.route('/')
            .post(authMiddlware,commentsControllers.AddComment)
            .get(authMiddlware,commentsControllers.GetAllComments)


commentsRoutes.route('/:id')
            .get(authMiddlware,commentsControllers.GetComment)
            .put(authMiddlware,checkComments,commentsControllers.updateComment)
            .delete(authMiddlware,checkComments,commentsControllers.deleteComment)

module.exports = commentsRoutes;