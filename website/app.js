/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=78857c9b274884e72a9434418cabc940";
const dateCard = document.getElementById("date");
const tempCard = document.getElementById("temp");
const contentCard = document.getElementById("content");

/* Helper functions */

// Get weather data from Open Weather API
const getWeather = async (url, zip, key) => {
  // console.log(url + zip + key); // DEBUGAAAAAAAAAAAAAAA
  let res = await fetch(`${url}${zip}${key}`);
  try {
    res = await res.json();
    // console.log("getWeather:\n" + res); // DEBUGAAAAAAAAAAAAAAA
    return res;
  } catch (error) {
    // console.log("HERE's an ERR man\n" + error); // DEBUGAAAAAAAAAAAAAAA
    // appropriately handle the error
  }
};

// Post received data to our express server
const postData = async (url = "", data = {}) => {
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

// Update UI with weather data, today's date and user feelings
const updateUI = (date, weatherObj, content) => {
  dateCard.innerHTML = date;
  tempCard.innerHTML = `Forecast: ${weatherObj.forecast}`;
  contentCard.innerHTML = content;
};

// Create a new date instance dynamically with JS
const makeDate = () => {
  let d = new Date();
  return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
};

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zipcode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const newDate = makeDate();

  getWeather(baseURL, zipcode, apiKey)
    .then((data) => postData("/add-weather", data))
    .then((res) => {
      console.log(res.msg); // DEBUGAAAAAAAAAAAAAAA
      if (res.msg === "Data recieved") {
        updateUI(newDate, res.data, feelings);
      } else {
        contentCard.innerHTML = res.msg;
      }
    });
}

// https://worldpostalcode.com/
