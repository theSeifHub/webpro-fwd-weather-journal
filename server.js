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
  console.log(`Aahhh! I'm alive on ${port}`);
};
const server = app.listen(port, listeningSuccess);

// post data function
app.post("/add-weather", (req, res) => {
  console.log(req.body.message); // DEBUGAAA
  if (req.body.sys) {
    console.log(`Server: Hello from ${req.body.name}, ${req.body.sys.country}!
  #########################################`); // DEBUGAAA
    console.log(req.body); // DEBUGAAA
    const newCity = req.body;
    projectData[`${req.body.id}`] = newCity;
    res.send({
      msg: "Data recieved",
      data: projectData[`${req.body.id}`],
    });
  } else {
    res.send({ msg: "other stuff happened" });
  }
});
