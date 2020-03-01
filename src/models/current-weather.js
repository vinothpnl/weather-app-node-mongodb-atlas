const mongoose = require('mongoose');

const CurrentWeather = mongoose.model('currentWeather', {
    location: {
        type: String
    },
    currentWeather: {
        type: String,
        required: true
    }
});

module.exports = CurrentWeather;