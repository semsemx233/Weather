// today vars
let todayName = document.querySelector('#today-name');
let todayNumber = document.querySelector('#today-number');
let todayMonth = document.querySelector('#today-month');
let todayLocation = document.querySelector('#location');
let todayTemp = document.querySelector('.num');
let todayIcon = document.querySelector('.forecast-icon img');
let todayCondition = document.querySelector('.condition-text');
let todayHumidity = document.querySelector('#humidity');
let todayWindSpeed = document.querySelector('#windSpeed');
let todayWindDir = document.querySelector('#wind_dir');

// next day vars
let maxtemp_c = document.querySelectorAll('.maxtemp_c')
let mintemp_c = document.querySelectorAll('.mintemp_c')
let condition = document.querySelectorAll('.custom')
let nextDayIcon = document.querySelectorAll('.next-day-icon')
let nextDay_Day = document.querySelectorAll('.day')

// search
let searchInput = document.querySelector('#search')




async function getWeatherData (cityName){
    let apiKey = '09a27c110b524cb0876215949242302'
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3`);
    let weatherData = await weatherResponse.json()

    return weatherData
}

function displayTodayWeather(data){
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleString('en-us', {weekday:'long'});
    todayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleString('en-us', {month:'long'});

    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c + '<sup>o</sup>C';
    todayCondition.innerHTML = data.current.condition.text;
    todayIcon.src = data.current.condition.icon;
    todayHumidity.innerHTML = data.current.humidity + '%';
    todayWindSpeed.innerHTML = data.current.wind_kph + 'km/h';
    todayWindDir.innerHTML = data.current.wind_dir;
}

function displayNextDayWeather(data){
    let forecastData = data.forecast.forecastday;
    
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i+1].date)
        nextDay_Day[i].innerHTML = nextDate.toLocaleString('en-us', {weekday:'long'})
        maxtemp_c[i].innerHTML = forecastData[i+1].day.maxtemp_c
        mintemp_c[i].innerHTML = forecastData[i+1].day.mintemp_c
        condition[i].innerHTML = forecastData[i+1].day.condition.text
        nextDayIcon[i].src = forecastData[i+1].day.condition.icon
        
    }
}

async function startApp(city='cairo'){
    let weatherData = await getWeatherData(city);

    if(!weatherData.error){
        displayTodayWeather(weatherData);
        displayNextDayWeather(weatherData)
    }


}

startApp()

searchInput.addEventListener('input', function(){
    startApp(searchInput.value)
})