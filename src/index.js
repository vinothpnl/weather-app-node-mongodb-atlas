const express = require('express');
require('./db/mongoose');
const CurrentWeather = require('./models/current-weather');
const getWeather = require('./live-weather-api');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017',
    databaseName = 'weather-app';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// avgtempinsfax

app.post('/avgtempinsfax', (req, res) => {
    MongoClient.connect(connectionUrl, {
        useNewUrlParser: true
    }, (error, client) => {
        if (error) {
            return console.log(`Unable to connect to database!, ${error}`);
        }
        console.log(`Connected Successfully`);
        const db = client.db(databaseName);

        // find document

        db.collection('avgtemps').findOne(req.body, (error, result) => {
            if (error) {
                return console.log(`Unable to find documents: ${error}`);
            }
            console.log(`Retrieve Success: ${JSON.stringify(result)}`);
            if (result === null) {
                res.status(404);
                res.send('Unable to find the document!');
            } else {
                console.log(`Location: ${req.body.location},
                Highest temperature: ${result.tempHigh},
                Lowest temperature: ${result.tempLow}`)
                res.send(result)
            }
        });
    })
})


let weatherReport = '',
    coordinates = {};

// Function get the live weather report from open API servers

const getLiveReport = async (req) => {
    try {
        coordinates = await getWeather.fetchGeoLocation(req);
        console.log(`Coordinates: ${JSON.stringify(coordinates)}`);
        weatherReport = await getWeather.fetchWeatherDetails(coordinates.latitude, coordinates.longitude);
        console.log(`Extracted current weather report: ${JSON.stringify(weatherReport)}`);
    } catch (error) {
        console.log(`Error: ${error}`);
        weatherReport = error;
    }
    return weatherReport
}

// Current temperature in Covilha or any Cities in the world can be retrieved

app.post('/currenttempincovilha', (req, res) => {
    let finalDoc = '';
    let doc = {};
    const invokeLiveReport = async () => {
        const test = await getLiveReport(req);
        finalDoc = `Current Temperature in ${req.body.location} is ${weatherReport.currentTemp} degrees. There's a ${weatherReport.precipProbability}% chance of rain`;
       console.log(`Weather report: ${finalDoc}`)
        doc = {
            location: req.body.location,
            currentWeather: finalDoc
        }
        const curWeather = new CurrentWeather(doc);
        curWeather.save().then(() => {
            res.send(curWeather);
        }).catch((e) => {
            console.log(`Error: ${e}`)
            res.status(400);
            res.send(e);
        })
    }
    invokeLiveReport()
});

// server

app.listen(port, () => {
    console.log(`The server is up and running on port ${port}`);
})