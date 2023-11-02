const express = require('express');
const router = express.Router();

// Import all the routes from the routes folder
const challengeRoutes = require('./challenges/challengeRoutes.js');
const userRoutes = require('./users/userRoutes.js');
const postsRoutes = require('./posts/postRoutes.js');
// const loginRoutes = require('./login/loginRoutes.js');
// const registerRoutes = require('./register/registerRoutes.js');
// const logoutRoutes = require('./logout/logoutRoutes.js');
// const profileRoutes = require('./profile/profileRoutes.js');
// const searchRoutes = require('./search/searchRoutes.js');
const imagesRoutes = require('./images/imagesRoutes.js');


// Use the routes
router.use('/challenges', challengeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postsRoutes);
router.use('/images', imagesRoutes);
// router.use('/login', loginRoutes);
// router.use('/register', registerRoutes);
// router.use('/logout', logoutRoutes);
// router.use('/profile', profileRoutes);
// router.use('/search', searchRoutes);


module.exports = router;