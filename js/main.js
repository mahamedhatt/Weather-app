const apiKey = 'eb5dac34460946cd96084718242406';

// http://api.weatherapi.com/v1/forecast.json?key=eb5dac34460946cd96084718242406&q=07112&days=7

let todayName = document.getElementById('today-day-name');
let todayNumber = document.getElementById('today-day-number');
let todayMonth = document.getElementById('today-day-month');
let todayLocation = document.getElementById('today-location');
let todayDegree = document.getElementById('today-degree');
let todayIcon = document.getElementById('today-icon-condition');
let todayTemp = document.getElementById('today-temp');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let direction = document.getElementById('direction');

let nextDayName = document.getElementsByClassName('next-day-name');
let nextDayDegreeMax = document.getElementsByClassName('next-day-degree-max');
let nextDayDegreeMin = document.getElementsByClassName('next-day-degree-min');
let nextDayTemp = document.getElementsByClassName('next-day-temp');
let iconCondition = document.getElementsByClassName('icon-condition');

let search = document.getElementById('search');

// fetch api data
async function getWeatherData(name) {
  let weatherLink = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=eb5dac34460946cd96084718242406&q=${name}&days=7`
  );
  let weatherData = await weatherLink.json();
  return weatherData;
}

// search
search.addEventListener('input', function () {
  displayApp(search.value);
});

function displayTodayData(index) {
  let todayDate = new Date();
  todayName.innerHTML = todayDate.toLocaleDateString('en-us', {
    weekday: 'long',
  });
  todayNumber.innerHTML = todayDate.getDate();
  todayMonth.innerHTML = todayDate.toLocaleDateString('en-us', {
    month: 'long',
  });
  todayLocation.innerHTML = index.location.name;
  todayDegree.innerHTML = index.current.temp_c + '°C';
  todayIcon.setAttribute('src', 'https:' + index.current.condition.icon);
  todayTemp.innerHTML = index.current.condition.text;
  humidity.innerHTML = index.current.humidity + '%';
  wind.innerHTML = index.current.wind_kph + 'km/h';
  direction.innerHTML = index.current.wind_dir;
}

function displayNextDays(index) {
  let forecastData = index.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let date = new Date(forecastData[i + 1].date);
    nextDayName[i].innerHTML = date.toLocaleDateString('en-us', {
      weekday: 'long',
    });
    nextDayDegreeMax[i].innerHTML = forecastData[i + 1].day.maxtemp_c + '°C';
    nextDayDegreeMin[i].innerHTML = forecastData[i + 1].day.mintemp_c + '°C';
    iconCondition[i].setAttribute(
      'src',
      'https:' + forecastData[i + 1].day.condition.icon
    );
    nextDayTemp[i].innerHTML = forecastData[i + 1].day.condition.text;
  }
}

async function displayApp(country = 'cairo') {
  let weatherData = await getWeatherData(country);
  displayTodayData(weatherData);
  displayNextDays(weatherData);
}

displayApp();
