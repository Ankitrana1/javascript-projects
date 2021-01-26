'use strict';

const apiKey = '632a5a988599f24ea60ef834c27f22d7';
const notification = document.querySelector('.notification');
const weatherIcon = document.querySelector('.weather-icon img');
const value = document.querySelector('.temperature-value p');
const description = document.querySelector('.temperature-description p');
const myLocation = document.querySelector('.location p');
const maxTemp = document.querySelector('.max p span');
const minTemp = document.querySelector('.min p span');
const humidity = document.querySelector('.humid p span');
const pressure = document.querySelector('.pressure p span');

const weather = {}
weather.temperature = {
    unit : 'celcius',
    symbol : 'C'
}
const KELVIN = 273;

function loadWeatherDetails(){
    console.log(navigator);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        notification.style.display = 'block';
        notification.innerHTML = "<p>Geolocation is not supported by this browser</p>";
    }
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log("Latitude: " + latitude +" Longitude: " + longitude);
    getWeatherApiResponse(latitude, longitude);
}

function showError(error){
    console.log(error);
    notification.style.display = 'block';
    notification.innerHTML = "<p>User denied Geolocation permissions</p>";
}

function getWeatherApiResponse(latitude, longitude){
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetch(url).then(response => {
        const status = response.status.toString();
        if(status.startsWith('20')){
            return response.json();
        } else {
            throw 'Weather API retrieval failed!';
        }
    }).then(data => {
        console.log(data);
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.icon = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.description = data.weather[0].description;
        weather.minTemp =  Math.floor(data.main.temp_min- KELVIN);
        weather.maxTemp =  Math.floor(data.main.temp_max- KELVIN);
        weather.humidity = data.main.humidity;
        weather.pressure = data.main.pressure;
        displayWeather();
    }).catch(error =>{
        console.log(error);
    });
}

function displayWeather(){
    value.innerHTML = `${weather.temperature.value} °${weather.temperature.symbol}`;
    weatherIcon.src = `icons/${weather.icon}.png`;
    description.innerText = `${weather.description}`; 
    myLocation.innerText = weather.city + `, ${weather.country}`;
    maxTemp.innerText = `${weather.maxTemp} °${weather.temperature.symbol}`;
    minTemp.innerText = `${weather.minTemp} °${weather.temperature.symbol}`;
    humidity.innerText = weather.humidity + ' g.m-3';
    pressure.innerText = weather.pressure + ' mb';
}

function convertTemperature(){
    if(weather.temperature.unit === 'celcius'){
        weather.temperature.unit = 'fahrenheit';
        weather.temperature.symbol = 'F';
        weather.temperature.value = Math.floor(weather.temperature.value * 9/5 + 32);
    } else {
        weather.temperature.unit = 'celcius';
        weather.temperature.symbol = 'C';
        weather.temperature.value = Math.floor((weather.temperature.value- 32) *5/9);
    }
    displayWeather();
}

value.addEventListener('click', convertTemperature);