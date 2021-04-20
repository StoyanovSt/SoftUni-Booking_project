const router = require('express').Router();

const homeController = require('./controllers/homeRoutes.js');
const authController = require('./controllers/authRoutes.js');
const hotelController = require('./controllers/hotelRoutes.js');
const userPagesController = require('./controllers/userRoutes.js');

router.use(homeController);
router.use(authController);
router.use(hotelController);
router.use(userPagesController);

module.exports = router;