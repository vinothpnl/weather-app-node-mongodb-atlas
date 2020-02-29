const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017',
    databaseName = 'weather-app';

MongoClient.connect(connectionUrl, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log(`Unable to connect to database!, ${error}`);
    }
    console.log(`Connected Successfully`);
    const db = client.db(databaseName);

    // insert one

    // db.collection('location').insertOne({
    //     location: 'Netherlands',
    //     averageTemperature: '2 degree'
    // }, (error, result) => {
    //     if(error){
    //         return console.log(`Unable to insert the location details`);
    //     }
    //     console.log(`Insertion Success: ${JSON.stringify(result.ops)}`);
    // });


    // insert many

    // db.collection('location').insertMany([{
    //         location: 'Den Haag',
    //         averageTemperature: '2 degree'
    //     },
    //     {
    //         location: 'Amserdam',
    //         averageTemperature: '3 degree'
    //     },
    //     {
    //         location: 'Rotterdam',
    //         averageTemperature: '1 degree'
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log(`Unable to insert documents: ${error}`);
    //     }
    //     console.log(`Insertion Success: ${JSON.stringify(result.ops)}`);

    // });

    // Find document

    db.collection('location').find({
        averageTemperature: '2 degree'
    }, (error, result) => {
        if (error) {
            return console.log(`Unable to find documents: ${error}`);
        }
        console.log(`Retrieve Success: ${JSON.stringify(result)}`);
    });
})