const config = {
    PORT: 5000,
    DB_CONNECTION: 'mongodb://localhost:27017/booking-project',
    SALT_ROUNDS: 9,
    SECRET: 'public',
};

module.exports = config;