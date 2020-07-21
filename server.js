"use strict";
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8888;
const listeningSuccess = () => {
  console.log(`Aaah! I'm alive on ${port}`);
};
const server = app.listen(port, listeningSuccess);

// post data function
app.post("/add-weather", (req, res) => {
  if (req.body.message) {
    console.log(req.body.message);
    res.send({ msg: req.body.message });
  } else if (req.body.id) {
    console.log(
      `Server: Hello from ${req.body.name}, ${req.body.sys.country}!`
    ); // DEBUGAAAAAAAAAAAAAAA

    console.log(req.body); // DEBUGAAAAAAAAAAAAAAA
    // console.log(temp); // DEBUGAAAAAAAAAAAAAAA

    const newForecast = {
      name: `${req.body.name}, ${req.body.sys.country}`,
      forecast: `${Math.ceil(req.body.main.temp - 273.15)} °C, with ${
        req.body.weather[0].description
      }.`,
    };
    projectData[`${req.body.id}`] = newForecast;
    res.send({
      msg: "Data recieved", // DEBUGAAAAAAAAAAAAAAA
      data: projectData[`${req.body.id}`],
    });
    console.log(projectData); // DEBUGAAAAAAAAAAAAAAA
    console.log(projectData[`${req.body.id}`]); // DEBUGAAAAAAAAAAAAAAA
  } else {
    res.send({ msg: "alien witchcraft" });
  }
});
