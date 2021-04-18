const config = {
    PORT: 5000,
    DB_CONNECTION: 'mongodb://localhost:27017/booking-project',
    SALT_ROUNDS: 9,
    SECRET: 'public',
    PASSWORD_VALIDATION_PATTERN: /^[a-zA-Z0-9]{5,}$/,
    EMAIL_VALIDATION_PATTERN: /^\w+\@[a-zA-Z]+\.[a-zA-Z]+$/,

};

module.exports = config;