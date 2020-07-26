/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=78857c9b274884e72a9434418cabc940";
const zipInput = document.getElementById("zip");
const dateCard = document.getElementById("date");
const tempCard = document.getElementById("temp");
const contentCard = document.getElementById("content");
const entryTitle = document.getElementsByClassName("title")[0];

/* Helper functions */

// Get weather data from Open Weather API
const getWeather = async (url, zip, key) => {
  let res = await fetch(`${url}${zip}${key}`);
  try {
    res = await res.json();
    return res;
  } catch (error) {
    console.log("HERE's an error man\n" + error); // DEBUGAAAAAAAAAAAAAAA
    // To appropriately handle the error later
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
  // console.log(response.dataId); // DEBUGAAAAAAAAAAAAAAA

  return response;
};

// Update UI with weather data, today's date and user feelings
const updateUI = async (url) => {
  let res = await fetch(url);
  try {
    res = await res.json();
    entryTitle.innerHTML = `${res.name}`;
    tempCard.innerHTML = `It's <span class="generated-data">${res.forecast}</span>`;
    dateCard.innerHTML = `On <span class="generated-data">${makeDate()}</span>`;
    const feelings = document.getElementById("feelings").value;
    if (feelings.length) {
      contentCard.innerHTML = `And you feel <span class="generated-data">${feelings}</span>`;
    } else {
      contentCard.innerHTML = "";
    }
  } catch (err) {
    console.error(err);
  }
};

// Create a new date instance dynamically with JS
const makeDate = () => {
  let d = new Date();
  return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
};

function performAction() {
  const zipcode = zipInput.value;

  getWeather(baseURL, zipcode, apiKey)
    .then((data) => postData("/add-weather", data))
    .then((res) => {
      console.log(res.msg); // DEBUGAAAAAAAAAAAAAAA

      if (res.msg === "Data recieved") {
        console.log(`with ID: ${res.dataId}`);
        updateUI("/get-weather");
      } else {
        entryTitle.innerHTML = res.msg;
        tempCard.innerHTML = "";
        dateCard.innerHTML = "";
        contentCard.innerHTML = "";
      }
    });
}

// Event listeners
document.getElementById("generate").addEventListener("click", performAction);
zipInput.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    performAction();
  }
});
