const mongoose = require('mongoose');

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
