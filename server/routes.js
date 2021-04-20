const router = require('express').Router();

const homeController = require('./homeRoutes.js');
const authController = require('./authRoutes.js');
const hotelController = require('./hotelRoutes.js');
const userPagesController = require('./userRoutes.js');

router.use(homeController);
router.use(authController);
router.use(hotelController);
router.use(userPagesController);

module.exports = router;