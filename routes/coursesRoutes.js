const express = require('express');
const coursesControllers = require('../Controllers/coursesControllers');
const authMiddlware = require('../Middlwares/auth');
const checkUser = require('../Middlwares/checkUser');
const coursesRoutes = express.Router();

coursesRoutes.route('/')
             .post(authMiddlware,coursesControllers.AddCourse)
             .get(authMiddlware,coursesControllers.GetAllCourses)

coursesRoutes.route('/:id')
             .get(authMiddlware,coursesControllers.GetCourse)
             .put(authMiddlware,checkUser,coursesControllers.updateCourse)
             .delete(authMiddlware,checkUser,coursesControllers.deleteCourse)

module.exports = coursesRoutes;