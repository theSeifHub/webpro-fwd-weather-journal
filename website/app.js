/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=78857c9b274884e72a9434418cabc940";

/* Helper functions */

// Get weather data from Open Weather API
const getWeather = async (url, zip, key) => {
  console.log(url + zip + key); // DEBUGAAA
  let res = await fetch(`${url}${zip}${key}`);
  try {
    res = await res.json();
    console.log("getWeather:\n" + res); // DEBUGAAA
    return res;
  } catch (error) {
    console.log("HERE's an ERR man\n" + error); // DEBUGAAA
    // appropriately handle the error
  }
};

// Post received data to our express server
const postDataToServer = async (url = "", data = {}) => {
  let response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  response = await response.json();
  return response;
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zipcode = document.getElementById("zip").value;
  getWeather(baseURL, zipcode, apiKey)
    .then((data) => postDataToServer("/add-weather", data))
    .then((res) => console.log(res));
}

// https://worldpostalcode.com/
