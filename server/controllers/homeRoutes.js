const router = require('express').Router();
const Hotel = require('../models/Hotel');

router.get('/', (req, res) => {
    // get all hotels
    Hotel.find()
        .sort({ freeRooms: -1 })
        .lean()
        .then(hotels => {
            res.status(200).json({
                hotels
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