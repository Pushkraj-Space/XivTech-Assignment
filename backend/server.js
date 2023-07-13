const express = require('express');
const app = express();
require('dotenv').config();
const axios = require('axios');

var cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY || 'e2097d706b084f81845181730231207';
app.post('/getWeather' , async (req, res) => {
    let cities = req.body.cities;
    let resWeater = {};
    for (let city of cities) {
        await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
        .then((report) => {
            resWeater[city] = report.data.current.temp_c;
        }).catch((err) => {
            resWeater[city] = "N/A";
        })
    }
    res.status(200).json({"weather" : resWeater});
})

app.listen(8081, () => {
    console.log("Application running");
})