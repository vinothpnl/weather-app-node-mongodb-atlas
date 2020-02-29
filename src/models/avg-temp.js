const mongoose = require('mongoose');

const AvgTemp = mongoose.model('avgTemp', {
    location: {
        type: String
    },
    avgTemp: {
        type: Number,
        required: true
    }
});

module.exports = AvgTemp;
