const mongoose = require('mongoose');

// Average temperature Model

const AvgTemp = mongoose.model('avgTemp', {
    location: {
        type: String
    },
    tempLow: {
        type: Number,
        required: true
    },
    tempHigh: {
        type: Number,
        required: true
    }
});

module.exports = {
    AvgTemp
};
