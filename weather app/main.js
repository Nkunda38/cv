
const api = {
  key: "30ffc3a04fb3eb1c8173b41de943ccb3",
  baseurl: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.key === "Enter") {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((response) => response.json())
    .then(displayResults)
    .catch((error) => console.error('Error fetching weather data:', error));
}

function displayResults(weather) {
  console.log(weather);
  
  // Update city and date
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
  
  // Update temperature and weather condition
  let temp = document.querySelector('.current .temperature');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span><sup>o</sup>C</span>`;
  
  let weatherDescription = document.querySelector('.current .weather');
  weatherDescription.innerText = weather.weather[0].description;
  
  let hiLow = document.querySelector('.current .hi-low');
  hiLow.innerHTML = `${Math.round(weather.main.temp_min)}<sup>o</sup>C / ${Math.round(weather.main.temp_max)}<sup>o</sup>C`;
}

function dateBuilder(d) {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  
  return `${day}, ${date} ${month} ${year}`;
}
