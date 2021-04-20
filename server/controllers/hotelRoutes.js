const router = require('express').Router();
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const isAuthorized = require('../middlewares/isAuthorized.js');

// Add hotel
router.post('/hotel/add', isAuthorized, (req, res) => {
    // get data
    let { name, city, freeRooms, imageUrl } = req.body;

    //validate data
    if (name.length < 4) {
        res.status(409).json({
            message: 'Hotel name must be atleast 4 symbols!',
            hasError: true,
        });

        return;
    }

    if (city.length < 3) {
        res.status(409).json({
            message: 'City name must be atleast 3 symbols!',
            hasError: true,
        });

        return;
    }

    if (!imageUrl.startsWith('http') || !imageUrl.startsWith('https')) {
        res.status(409).json({
            message: 'ImageUrl shoud start with http or https!',
            hasError: true,
        });

        return;
    }

    // get user id
    const userId = req.user._id;

    // store in database
    const newHotel = new Hotel({
        name,
        city,
        freeRooms,
        imageUrl,
        owner: userId,
    });


    newHotel.save()
        .then(hotel => {
            User.findById(userId)
                .then(user => {
                    user.offeredHotels.push(hotel._id);
                    return user.save();
                })
                .then(response => {
                    res.status(201).json({
                        message: 'Hotel successfully added!',
                        hasError: false,
                    });
                })
                .catch(err => {
                    res.status(404).json({
                        message: 'User not found!',
                        hasError: true,
                    });
                });

        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong! Failed to add hotel in database!',
                hasError: true,
            });
        });
});

// Hotel details page
router.get('/hotel/:hotelId/details', isAuthorized, (req, res) => {
    const currentLoggedUserId = req.user._id;

    // get hotel id
    const hotelId = req.params.hotelId;

    // get hotel by id from database
    Hotel.findById(hotelId).lean()
        .then(hotel => {
            res.status(200).json({
                hotel,
                currentLoggedUserId,
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server error!',
                hasError: true,
            });
        });

});

// Delete hotel
router.get('/hotel/:hotelId/delete', isAuthorized, (req, res) => {
    // get hotel id
    const hotelId = req.params.hotelId;

    // find it is database by id and delete it
    Hotel.findByIdAndDelete(hotelId)
        .then(response => {
            res.status(200).json({
                message: 'Successfully deleted!',
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

// Book hotel
router.get('/hotel/:hotelId/book', isAuthorized, (req, res) => {
    const currentLoggedUserId = req.user._id;

    // get hotel id
    const hotelId = req.params.hotelId;

    Hotel.findById(hotelId).lean()
        .then(hotel => {
            Hotel.updateOne({ _id: hotelId }, { freeRooms: hotel.freeRooms - 1 })
                .then(response => {
                    return Hotel.updateOne({ _id: hotelId }, { $push: { usersBookedARoom: currentLoggedUserId } });
                })
                .then(response => {
                    User.findById(currentLoggedUserId).lean()
                        .then(user => {
                            return User.updateOne({ _id: currentLoggedUserId }, { $push: { bookedHotels: hotelId } });
                        })
                        .then(response => {
                            res.status(200).json({
                                message: 'A room has been booked',
                                hasError: false,
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: 'Internal server error!',
                                hasError: true,
                            });
                        });
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Internal server error!',
                        hasError: true,
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server error!',
                hasError: true,
            });
        });
})

// Edit hotel
router.get('/hotel/:hotelId/edit', isAuthorized, (req, res) => {
    // get hotel id
    const hotelId = req.params.hotelId;

    // get hotel by id from database
    Hotel.findById(hotelId).lean()
        .then(hotel => {
            res.status(200).json({
                hotel,
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

router.post('/hotel/:hotelId/edit', isAuthorized, (req, res) => {
    // get editted data
    const { hotelName, city, freeRooms, imageUrl } = req.body;

    // validate data
    if (hotelName.length < 4) {
        res.status(409).json({
            message: 'Hotel name must be atleast 4 symbols!',
            hasError: true,
        });

        return;
    }

    if (city.length < 3) {
        res.status(409).json({
            message: 'City name must be atleast 3 symbols!',
            hasError: true,
        });

        return;
    }

    if (!imageUrl.startsWith('http') || !imageUrl.startsWith('https')) {
        res.status(409).json({
            message: 'ImageUrl shoud start with http or https!',
            hasError: true,
        });

        return;
    }

    // get product id
    const hotelId = req.params.hotelId;

    // find one and update multiple
    Hotel.updateOne({ _id: hotelId }, { name: hotelName })
        .then(response => {
            return Hotel.updateOne({ _id: hotelId }, { city: city });
        })
        .then(response => {
            return Hotel.updateOne({ _id: hotelId }, { freeRooms: freeRooms });
        })
        .then(response => {
            return Hotel.updateOne({ _id: hotelId }, { imageUrl: imageUrl });
        })
        .then(response => {
            res.status(200).json({
                hasError: false,
                message: 'Hotel has been successfully eddited!',
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server error!',
                hasError: true,
            });
        })
});

module.exports = router;