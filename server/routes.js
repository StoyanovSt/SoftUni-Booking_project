const router = require('express').Router();
const User = require('./models/User');
const Hotel = require('./models/Hotel');
const bcrypt = require('bcrypt');
const config = require('./config/config');
const jwt = require('jsonwebtoken');
const isAuthorized = require('./middlewares/isAuthorized.js');

// Home page
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

// AUTH-----------------------------
// Register
router.post('/register', (req, res) => {
    // get user data
    const userData = req.body;

    // validate data
    if (!userData.email.match(config.EMAIL_VALIDATION_PATTERN)) {
        res.status(409).json({
            message: 'Email must be a valid e-mail and may contains only english letters and digits!',
            hasError: true,
        });

        return;
    }

    if (!userData.password.match(config.PASSWORD_VALIDATION_PATTERN)) {
        res.status(409).json({
            message: 'Password must be atleast five characters long and may contains only english letters and digits!',
            hasError: true,
        });

        return;
    }

    // chech if such user exists in database
    User.findOne({ username: userData.username })
        .then(user => {
            if (user) {
                res.status(409).json({
                    message: 'User already exists!',
                    hasError: true,
                });

                return;

            } else {
                // check if password and rePassword matches
                if (userData.password !== userData.rePassword) {
                    res.status(400).json({
                        message: 'Passwords do not match!',
                        hasError: true,
                    });

                    return;
                }

                // hash password
                bcrypt.genSalt(config.SALT_ROUNDS)
                    .then(salt => {
                        bcrypt.hash(userData.password, salt)
                            .then(hash => {
                                // store in database
                                const user = new User({ email: userData.email, username: userData.username, password: hash });

                                user.save()
                                    .then(response => {
                                        res.status(201).json({
                                            message: 'Successful registration!',
                                            hasError: false,
                                        });

                                    })
                                    .catch(error => {
                                        res.status(409).json({
                                            message: 'Invalid inputs!',
                                            hasError: true,
                                        });
                                    });
                            })
                            .catch(error => {
                                res.status(500).json({
                                    message: 'Internal server error!',
                                    hasError: true,
                                });
                            });
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: 'Internal server error!',
                            hasError: true,
                        });
                    });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error!',
                hasError: true,
            });
        });

});

// Login
router.post('/login', (req, res) => {
    // get user data
    const userData = req.body;

    // check if such user exists in database
    User.findOne({ username: userData.username })
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: 'Invalid username or password!',
                    hasError: true,
                });

                return;
            }

            // check if passwords match
            bcrypt.compare(userData.password, user.password)
                .then(response => {
                    if (!response) {
                        res.status(409).json({
                            message: 'Invalid username or password!',
                            hasError: true,
                        });

                        return;
                    }

                    // generate jwt and send it to the client as json
                    const token = jwt.sign({
                        _id: user._id,
                    }, config.SECRET);

                    res.status(200).json({
                        message: 'Successful logged in!',
                        token: token,
                        username: user.username,
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

});

//----------------------------------------------------------------------------
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
                    return Hotel.updateOne({ _id: hotelId }, { $push: { usersBookedARoom: currentLoggedUserId } })
                })
                .then(response => {
                    res.status(200).json({
                        message: 'A room has been booked',
                        hasError: false,
                    });
                })
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

//-----------------------------------

module.exports = router;