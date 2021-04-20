const router = require('express').Router();
const User = require('../models/User');
const isAuthorized = require('../middlewares/isAuthorized.js');

router.get('/user/profile', isAuthorized, (req, res) => {
    // get current user by id
    const currentLoggedUserId = req.user._id;

    User.findById(currentLoggedUserId)
        .populate('bookedHotels')
        .then(userInfo => {
            res.status(200).json({
                username: userInfo.username,
                userEmail: userInfo.email,
                userReservations: userInfo.bookedHotels,
                hasError: false,
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server error!',
                hasError: true,
            });
        });

});

module.exports = router;