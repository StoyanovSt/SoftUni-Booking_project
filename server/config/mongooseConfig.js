const mongoose = require('mongoose');
const config = require('./config');

function setupMongoose() {
    mongoose.connect(config.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('Connected to the database!'));

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', true);
    mongoose.set('useCreateIndex', true);
};

module.exports = setupMongoose;

