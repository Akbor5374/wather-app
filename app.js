const notificationElement = document.querySelector(".alert");
//api key
const key = "12553632efa63f8d6a7abd629596c7d1";
//celsius convert
const cel = 273;

// current location
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
    notificationElement.style.display = "block";
    notificationElement.innerText = "browser does not support geolocation";
    setTimeout(() => {
		notificationElement.style.display = "none";
	}, 4000);
}
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerText = "please allow your location";
    setTimeout(() => {
		notificationElement.style.display = "none";
	}, 4000);
}

//get weather for api
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
     .then(response => response.json())
     .then(json => weather(json))
}
    
document.querySelector(".btn").addEventListener("click", function(){
        const cityName = document.querySelector(".search").value;
        let cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`;
        fetch(cityApi)
        .then(response => {
            if(response.ok){
                 return response.json()
            }
            else{
                notificationElement.style.display = "block";
                notificationElement.innerText = "Invalid city name";
                setTimeout(() => {
                    notificationElement.style.display = "none";
                }, 4000);
            }
        })
        .then(json => weather(json))
});

function weather(json){
        document.querySelector(".description").innerText = json.weather[0].description;
        let iconsValue = json.weather[0].icon;
        document.querySelector(".icon").innerHTML = `<img src= "icons/${iconsValue}.png">`;
         document.querySelector("#temperature").innerText = Math.floor(json.main.temp - cel);
         document.querySelector(".tempMin").innerText = Math.floor(json.main.temp_min - cel) ;
         document.querySelector(".tempMax").innerText = Math.floor(json.main.temp_max - cel) ;
         document.querySelector(".pressure").innerText = json.main.pressure ;
         document.querySelector(".humidity").innerText = json.main.humidity ;
         let cityName = json.name;
         let countryName= json.sys.country;
         let output = `${cityName} , ${countryName}`;
         document.querySelector(".city").innerText = output;
         let wind_degValue = json.wind.deg;
         let wind_speedValue = json.wind.speed;
         document.querySelector(".wind").innerText = `${wind_degValue}m/s , ${wind_speedValue}`;
         document.querySelector(".search").value = "";
}


let months = ["January","February","March","April","May","June","July","August","September","October","November","December",];

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

const dateTime = new Date();
let cHours = dateTime.getHours() > 12 ? dateTime.getHours() - 12 : dateTime.getHours();
const hours = cHours == 0 ? cHours = 1 : cHours;
const am_pm = dateTime.getHours() >= 12 ? "pm" : "am";
const minute = dateTime.getMinutes();
const day = days[dateTime.getDay()];
const date = dateTime.getDate();
const month = months[dateTime.getMonth()];
const year = dateTime.getFullYear();
document.querySelector(".time").innerText = `${day} ${date} ${month} ${year} , ${hours}:${minute} ${am_pm}`;

