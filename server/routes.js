const router = require('express').Router();
const User = require('./models/User');
const bcrypt = require('bcrypt');
const config = require('./config/config');
const jwt = require('jsonwebtoken');
// const isAuthorized = require('./middlewares/isAuthorized.js');

// AUTH-----------------------------
// Register
router.post('/register', (req, res) => {
    // get user data
    const userData = req.body;

    // validate data

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

module.exports = router;