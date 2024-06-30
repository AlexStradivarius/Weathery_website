let weather = {
  apiKey: "c5c35292524e237fc60540ad834330e1",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
    this.fetchForecast(city);
  },
  fetchWeatherByLocation: function (lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
    this.fetchForecastByLocation(lat, lon);
  },
  fetchForecast: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayForecast(data));
  },
  fetchForecastByLocation: function (lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayForecast(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  },
  displayForecast: function (data) {
    const forecastContainer = document.querySelector(".forecast");
    forecastContainer.innerHTML = "";

    let forecastDays = [];

    for (let i = 0; i < data.list.length; i++) {
      const { dt_txt } = data.list[i];

      if (forecastDays.includes(new Date(dt_txt).toLocaleDateString())) {
        continue;
      }

      forecastDays.push(new Date(dt_txt).toLocaleDateString());

      if (i == 0) {
        continue;
      }

      const { icon, description } = data.list[i].weather[0];
      const { temp } = data.list[i].main;

      const forecastElement = document.createElement("div");
      forecastElement.classList.add("forecast-day");

      forecastElement.innerHTML = `
        <p class="forecast-day-date">${new Date(
          dt_txt
        ).toLocaleDateString()}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" class="forecast-day-icon" alt="${description}">
        <p class="forecast-day-temp">${Math.round(temp)}°C</p>
        <p class="forecast-day-description">${description}</p>
      `;

      forecastContainer.appendChild(forecastElement);
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
  getLocation: function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.fetchWeatherByLocation(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        () => {
          alert("Could not retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.getLocation();
