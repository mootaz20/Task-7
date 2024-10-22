const express = require('express');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const videosRoutes = require('./routes/videosRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const app = express();

app.use(express.json());

app.use('/api/register',registerRoutes);
app.use('/api/login',loginRoutes);
app.use('/api/logout',logoutRoutes);
app.use('/api/courses',coursesRoutes);
app.use('/api/videos',videosRoutes);
app.use('/api/comments',commentsRoutes);

module.exports = app;