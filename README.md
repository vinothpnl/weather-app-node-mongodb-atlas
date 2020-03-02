## The Weather App - NodeJS - MongDb Atlas

This application provides two opearations,

1. currenttempincovilha 
2. avgtempinsfax

## currenttempincovilha: 
    
    Retrieves current temperature in Covilha and any cities in the world from MongoDb Database collection. The darksky weather server is the source of data which fetches the live data based on the latitude and longitude. And map box server is giving the latitude and longitude based in the City name.  

## avgtempinsfax

    Retrieves data from MongoDb Collection for Current Temperature of Sfax,Tunisia for June Month

## Steps to run the Applications

1. Install Monga Db and Robo 3 T
2. Create a folder in your local for saving data. (Ex: 'mongodb-data') 
3. Run the command from your terminal, \Users\your_user_name\mongodb\mongod.exe --dbpath=\Users\mongodb-data
4. Now your DB is up and running
5. Go to the project folder and run 'npm run dev'. Now the server is up and running
6. Go to postman and hit 'localhost:3000currenttempincovilha' with the following body
    {
        "location": "Covilha"
    }
7. Now you should be able to see the response and the data pushed in the 'weather-app' database and see the collection currentTemps
8. In the terminal the log should be there of the document

##  Sample request and response for currenttempincovilha below

     **Request**

    {
        "location": "Covilha"
    }
    **Response**

    {
    "_id": "5e5d45a9b2f983262ccdfee1",
    "location": "Covilha",
    "currentWeather": "Current Temperature in Covilha is 5.31 degrees. There's a 0.05% chance of rain",
    "__v": 0
    }


##  Sample request and response for avgtempinsfax below

  **Request**

    {
        "location": "Sfax"
    }
    **Response**

    {
         "_id": "5e5c099aa9aab5b294a31731",
         "location": "Sfax",
         "tempLow": 19,
         "tempHigh": 30
    }


## Authors

* **Vinoth** - *Initial work* 

