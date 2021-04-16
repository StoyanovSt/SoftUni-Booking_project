const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    freeRooms: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    usersBookedARoom: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    owner: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Hotel', hotelSchema);