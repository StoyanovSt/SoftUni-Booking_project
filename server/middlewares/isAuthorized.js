const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

module.exports = (req, res, next) => {
    // check if current user has jwt 
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        console.log(token);

        // verify jwt and throw an error if jwt not valid
        jwt.verify(token, config.SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'Unauthorized!',
                    hasError: true,
                    unauthorized: true,
                });

                return;
            } else {
                // attach user data to req
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({
            message: 'Unauthorized!',
            hasError: true,
            unauthorized: true,
        });

        return;
    }

};