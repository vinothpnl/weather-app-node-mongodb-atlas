const express = require('express');
require('./db/mongoose');
const AvgTemp = require('./models/avg-temp');
const request = require('request');

// const request = require('../src/dark-sky-weather-api');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


let url = 'https://api.darksky.net/forecast/225a9ac8922cbfe39420b66c87328302/37.8267,-122.4233';

let headers = {
    'Content-Type': 'application/json'
}
let getParam = {
    header: headers,
    url: url,
    json: true
}
request.get(getParam, (error, response) => {
    if (error) {
        console.log(`Error: ${error}`)
    }
    console.log(`Response: ${response}`)
})

app.post('/avgtempinsfax', (req, res) => {
    const avgTemp = new AvgTemp(req.body);
    avgTemp.save().then(() => {
        res.send(avgTemp);
    }).catch((e) => {
        res.status(400);
        res.send(e);
    })
});

app.listen(port, () => {
    console.log(`The server is up and running on port ${port}`);
})