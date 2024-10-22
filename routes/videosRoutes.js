const express = require('express');
const videosControllers = require('../Controllers/videosControllers');
const authMiddlware = require('../Middlwares/auth');
const checkCourse = require('../Middlwares/checkCourse');
const videosRoutes = express.Router();

videosRoutes.route('/')
            .post(authMiddlware,checkCourse,videosControllers.AddVideo)
            .get(authMiddlware,videosControllers.GetAllVideos)

videosRoutes.route('/:id')
            .get(authMiddlware,videosControllers.GetVideo)
            .put(authMiddlware,checkCourse,videosControllers.updateVideo)
            .delete(authMiddlware,checkCourse,videosControllers.deleteVideo)

module.exports = videosRoutes;