const mongoose = require('mongoose');

// Current temperature model

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