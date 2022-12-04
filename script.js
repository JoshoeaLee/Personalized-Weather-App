
///////////////////////////////////////////MAIN WEATHER FUNCTION RELEVANT CODE//////////////////////////////////////////////////////////////

/**
 * Fetches data from a weather API, gets it in JSON file and then pushes that data to the functions required for
 * displaying data on the screen relevant to weather
 * @param {*} city The city which the user searches for on the website.
 */
async function fetchWeather(city){
    let weatherAPIKey =  "36d094a508ca4258a0912914223011"; 
    let f = await fetch("http://api.weatherapi.com/v1/forecast.json?key= " + weatherAPIKey + "&q=" + city + "&days=2&aqi=no&alerts=no");
    let j = await f.json();
    displayCurrentWeather(j);
    displayHourlyWeather(j);
}

/**
 * Collects relevant data concerning the city searched, its temperature, description of its weather, uv rating,
 * wind speed, an 'iconcode' which is a numerical form of categorizing weather patterns, humidity and rainfall in mm.
 * @param {*} data JSON File containing all relevant weather data from the Weather API used
 */
function displayCurrentWeather(data){

    //If the data is undefined, data.location will be falsey.
    if(!data.location){
        alert("I've never heard of that city! Are you sure it exists?");
    }

    else{
        //Variables to display on the big card
    const city = data.location.name;     //city name
    const temp = data.current.temp_c;    //city temperature
    const desc = data.current.condition.text;    //city weather description
    const uv = data.current.uv;          //city uv index
    const wind = data.current.wind_kph;    //city wind speed
    const icon = data.current.condition.code;      //a code which helps decide what kind of 'icon' (cloud, sun, raincloud) would be appropriate for display
   

    //Displaying city name, temp, description, uv-index and wind speed on the big central card
    document.querySelector(".weatherTitle").innerHTML = city + " Weather";
    document.querySelector("#temperature").innerHTML = temp + "°";
    document.querySelector("#description").innerHTML = desc;
    document.querySelector("#uv").innerHTML = "UV Index: " + uv;
    document.querySelector("#wind").innerHTML = "Wind Speed: " + wind + " km/h"

    //Use the 'iconcode' to change the icon on the big card to something which represents the weather outside
    const weatherIcon = document.querySelector(".weatherIcon");
    displayIcon(weatherIcon, icon);   //weatherIcon here is the picture on the card, 'icon' refers to the iconcode from the JSON file


    
    //If the user is logged in, check the UV, humidity, rainfall and windspeed of the city against the user's personal 
    //weather preferences. Give alerts ('wear sunscreen, watch out the air is dry today! etc.') if appropriate for the user (User specifies
    //that they burn easily or that they don't like dry air etc...)
    if(checkLoggedIn()){

        //Collecting extra data relevant to personalized weather warnings
    const humidity = data.current.humidity;   //city humidity
    const rainfall = data.current.precip_mm;   //city rainfall (mm)

    //These will be displayed if a weather warning is deemed necessary for the user
    const alertIcon = document.querySelector(".bigCard_and_icon>.alert");    //Red Exclamation mark over card
    const warningOverlay = document.querySelector(".bigcard_overlay");     //An overlay giving user specific advice regarding the weather.

    //This is where the user's preferences are stored in the html
    const prefDiv = document.querySelector(".session-variables>div");

    //Check these factors against the user's preferences.
    uvCheck(uv, prefDiv, warningOverlay, alertIcon);
    humidityCheck(humidity, prefDiv, warningOverlay, alertIcon);
    rainCheck(rainfall, prefDiv, warningOverlay, alertIcon);
    windCheck(wind, prefDiv, warningOverlay, alertIcon);


    //If any of the checks give an 'alert' then the alertIcon above the card will be present and have a non-zero opacity
    //Show the warning overlay when you mouseover the alert and let it disappear when your mouse leaves it.
    if(alertIcon.style.opacity==0.7){
        alertIcon.addEventListener("mouseenter", ()=>{
            document.querySelector(".bigcard_overlay").style.opacity = "1";   
            document.querySelector(".bigcard_overlay").style.zIndex = "1";
        });
    
        alertIcon.addEventListener("mouseleave", ()=>{
            document.querySelector(".bigcard_overlay").style.opacity = "0";
            document.querySelector(".bigcard_overlay").style.zIndex = "0";
        });
    }
    } 
  }
}

/**
 * Collects relevant data concerning the city searched, its temperature, description of its weather, uv rating,
 * wind speed, an 'iconcode' which is a numerical form of categorizing weather patterns, humidity and rainfall in mm 
 * FOR A 48 HOUR PERIOD OF TIME. (Starting from 00:00am of the day searched to 23:00pm of the day after)
 * @param {*} data JSON File containing all relevant weather data from the Weather API used
 */
function displayHourlyWeather(data){

    //There are 24 smaller 'cards' which display hourly weather for the next 24 hours. They display time, a weathericon(sun, cloud, thunderbolt etc..)
    //and the temperature of that hour in Celsius.
    for(let i = 0; i<24; i++){
       const miniTime = document.querySelector(`.weather-scroller :nth-child(${i+1})>.hour-overlay-grid>.hour>.time`);
       const miniIcon = document.querySelector(`.weather-scroller :nth-child(${i+1})>.hour-overlay-grid>.hour>.mini-icon`);
       const miniTemp = document.querySelector(`.weather-scroller :nth-child(${i+1})>.hour-overlay-grid>.hour>.temp`);

       //Declaring variables to be used later on. These will have the actual data regarding the time, icon and temperature.
       let miniTimeData = 0;
       let miniIconCode = 0;
       let miniTempData = 0;


       //Get Local time.
       let localTimeString = data.location.localtime;
       //LocalTime is formatted like "2022-01-01 14:35" I only want the hour so I get the substring from the first hour digit to the ':'
       localIndex = localTimeString.indexOf(":");
       localTimeString = localTimeString.substring(11, localIndex);
       //.substring returns a string, make the string into an integer.
       let localTime = parseInt(localTimeString);


       //If we're on the current day... Retrieves time, weathericon and temp data for that hour. Also retrieves UV, humidity, rain, wind data 
       //for possible alerts.
       if(localTime+i+1<24){
         miniTimeData = data.forecast.forecastday[0].hour[localTime+i+1].time;
         miniIconCode = data.forecast.forecastday[0].hour[localTime+i+1].condition.code;
         miniTempData = data.forecast.forecastday[0].hour[localTime+i+1].temp_c; 

         hourlyUV = data.forecast.forecastday[0].hour[localTime+i+1].uv;
         hourlyHumidity = data.forecast.forecastday[0].hour[localTime+i+1].humidity;
         hourlyRain = data.forecast.forecastday[0].hour[localTime+i+1].precip_mm;
         hourlyWind = data.forecast.forecastday[0].hour[localTime+i+1].wind_kph;
       }
       //If we're on the next day...
       else{
         let nextDayTime = localTime + i + 1 - 24;
         miniTimeData = data.forecast.forecastday[1].hour[nextDayTime].time;
         miniIconCode = data.forecast.forecastday[1].hour[nextDayTime].condition.code;
         miniTempData = data.forecast.forecastday[1].hour[nextDayTime].temp_c; 

         hourlyUV = data.forecast.forecastday[1].hour[nextDayTime].uv;
         hourlyHumidity = data.forecast.forecastday[1].hour[nextDayTime].humidity;
         hourlyRain = data.forecast.forecastday[1].hour[nextDayTime].precip_mm;
         hourlyWind = data.forecast.forecastday[1].hour[nextDayTime].wind_kph;
       }

       //miniTimeData is in the format "2022-01-01 14:00" I want the entire time so I use slice here.
       miniTimeData = miniTimeData.slice(11);

       //Set an appropriate background given the local time.
       timeAppropriateBackground(localTime);
       //Display the correct 'weather icons' on the smaller cards.
       displayIcon(miniIcon, miniIconCode);
       //Display the appropriate time and temperature on the smaller cards.
       miniTime.innerHTML = miniTimeData;
       miniTemp.innerHTML = miniTempData;

      


    //If the user is logged in, check the UV, humidity, rainfall and windspeed of the city for each hour against the user's personal 
    //weather preferences. Give alerts ('wear sunscreen, watch out the air is dry! etc.') if appropriate for the user (User specifies
    //that they burn easily or that they don't like dry air etc...)
    if(checkLoggedIn()){
        const prefDiv = document.querySelector(".session-variables>div");  //Where the user's preferences are stored
        const alertIcon = document.querySelector(`.weather-scroller :nth-child(${i+1})>.alert`); //Alert icon above each small card
        //Overlay which displays warning for the hour if there is any.
        const hourOverlay = document.querySelector(`.weather-scroller :nth-child(${i+1})>.hour-overlay-grid>.hour-overlay`);


        //Checking the UV, humidity, rain and wind levels against the user's preferences.
        uvCheck(hourlyUV, prefDiv, hourOverlay, alertIcon);
        humidityCheck(hourlyHumidity, prefDiv, hourOverlay, alertIcon);
        rainCheck(hourlyRain, prefDiv, hourOverlay, alertIcon);
        windCheck(hourlyWind, prefDiv, hourOverlay, alertIcon);
    

    //Making the Alerts Interactive (mouseover them to reveal the warning overlay)
    if(alertIcon.style.opacity==0.7){
    alertIcon.addEventListener("mouseenter", ()=>{
        document.querySelector(`.weather-scroller :nth-child(${i+1})>.hour-overlay-grid>.hour-overlay`).style.opacity = "1";
        document.querySelector(`.weather-scroller :nth-child(${i+1})>.hour-overlay-grid>.hour-overlay`).style.zIndex = "1";
    });
    alertIcon.addEventListener("mouseleave", ()=>{
        document.querySelector(`.weather-scroller :nth-child(${i+1})>.hour-overlay-grid>.hour-overlay`).style.opacity = "0";
        document.querySelector(`.weather-scroller :nth-child(${i+1})>.hour-overlay-grid>.hour-overlay`).style.zIndex = "0";

    });
    }
}
    }
}

/**
 * Uses a code and then displays an appropriate 'weather icon' based on it.
 * @param {*} weatherIcon The img which will be changed depending on what weather it needs to represent
 * @param {*} iconCode A code which numerically identifies different weather patterns
 */
function displayIcon(weatherIcon, iconCode){
    let sunnyCodes = [1000];
    let cloudyCodes = [1003,1006,1009,1030,1035];
    let thunderyCodes = [1273,1276,1279,1282,1087];
    let windyCodes = [1114]
    
    if(sunnyCodes.includes(iconCode)){
        weatherIcon.src = "./SVG/sun.svg";
        weatherIcon.alt = "Sunny";
    }
    else if(cloudyCodes.includes(iconCode)){
        weatherIcon.src = "./SVG/cloud.svg";
        weatherIcon.alt = "Cloudy";
    }
    else if(thunderyCodes.includes(iconCode)){
        weatherIcon.src = "./SVG/thunder.svg";
        weatherIcon.alt = "Thunder"
    }
    else if(windyCodes.includes(iconCode)){
        weatherIcon.src = "./SVG/wind.svg";
        weatherIcon.alt = "Windy"
    } 
    else{
        weatherIcon.src = "./SVG/rain.svg";
        weatherIcon.alt = "Rainy"
    }
}

/**
 * Takes the local time of the city searched and sets a daytime/nighttime background dependant on the local time
 * @param {*} localTime The local time of the city searched.
 */
 function timeAppropriateBackground(localTime){
    if(localTime>=8 && localTime <=20)
    document.body.style.backgroundImage = "url(./Images/daytime.jpg)";

else
     document.body.style.backgroundImage = "url(./Images/nighttime.jpg)";
    
}

/**
 * Making the 'Search' button search the given city and get rid of any previous alerts that were given for the previous city.
 */
document.querySelector(".searchCityButton").addEventListener("click", ()=>{
    const searchCity = document.querySelector("#searchCity").value;
    resetAlerts();
    fetchWeather(searchCity);
})

/**
 * Takes all the alerts/warnings raised for the previous city searched and then gets rid of them.
 * Used when another city is being searched for and you need a fresh set of alerts.
 */
 function resetAlerts(){
    const allAlerts = document.querySelectorAll(".alert");
    allAlerts.forEach(alert => {alert.style.opacity = 0;
    });
    const allWarnings = document.querySelectorAll(".warning_overlay");
    allWarnings.forEach(warning =>{warning.innerHTML="";});
}

///////////////////////////////////////////WEATHER VS USER PREFERENCES CHECKS////////////////////////////////////////////////

/**
 * If any of the checks are set off (i.e - user says they don't like strong rain and strong rain is detected) then 
 * a red exclamation mark will appear over the hour where that alert is set off. The user can hover over the exclamation mark
 * to reveal an overlay which will tell them why the alert was set off (Multiple alerts are possible but only one exclamation point
 * will be shown. The overlay can display multiple warnings.)
 * @param {*} alertIcon The red exclamation mark above each weather card (main one and the smaller ones)
 */
function alertVisible(alertIcon){
    alertIcon.style.opacity = 0.7;
    }

/**
 * On account creation or during settings changes, the user says how easily they get burnt. 
 * According to this, the strictness of the UV warning will change.
 * @param {*} uv The UV index of the hour being checked.
 * @param {*} prefDiv A div which holds all the user preferences in HTML format
 * @param {*} warningOverlay An overlay which can be displayed if there is an alert, and will give an actual reason for warning
 * @param {*} alertIcon A red exclamation mark which appears if there is a warning. Can be hovered over to display more info.
 * @returns 
 */
function uvCheck(uv, prefDiv, warningOverlay, alertIcon){

    //User said they don't burn
    if(prefDiv.classList.contains("noburn")){
        return;
    }

    //User said they don't burn easy.
    else if(prefDiv.classList.contains("lessburn")){
        if(uv>7){
            let uvWarning = document.createElement("p");
            uvWarning.innerHTML = "Wear Sunscreen";
            warningOverlay.appendChild(uvWarning);
            alertVisible(alertIcon);
            return;
        }
        else{
            return;
        }
    }
    //User said they sometimes burn
    else if(prefDiv.classList.contains("someburn")){
        if(uv>5){
            let uvWarning = document.createElement("p");
            uvWarning.innerHTML = "Wear Sunscreen";
            warningOverlay.appendChild(uvWarning);
            alertVisible(alertIcon);
            return;
        }
        else{
            return;
        }
    }
    //User said they burn easily
    else if(prefDiv.classList.contains("muchburn")){
        if(uv>3.5){
            let uvWarning = document.createElement("p");
            uvWarning.innerHTML = "Wear Sunscreen";
            warningOverlay.appendChild(uvWarning);
            alertVisible(alertIcon);
            console.log("Appending at " + warningOverlay);
            return;
        }
        else{
            return;
        }
    }
    //User said they're very vulnerable to burning
    else{
        if(uv>2){
            let uvWarning = document.createElement("p");
            uvWarning.innerHTML = "Wear Sunscreen";
            warningOverlay.appendChild(uvWarning);
            alertVisible(alertIcon);
            return;
        }
            return;
    }        
}

/**
 * On account creation or during settings changes, the user states their preferences regarding humidity. 
 * According to this, humidity alerts may appear.
 * @param {*} humidity The humidity level of the hour being checked.
 * @param {*} prefDiv A div which holds all the user preferences in HTML format
 * @param {*} warningOverlay An overlay which can be displayed if there is an alert, and will give an actual reason for warning
 * @param {*} alertIcon A red exclamation mark which appears if there is a warning. Can be hovered over to display more info.
 * @returns 
 */
function humidityCheck(humidity, prefDiv, warningOverlay, alertIcon){
    const humidityWarning = document.createElement("p");
    
    //The user stated that they dislike dry air
    if(prefDiv.classList.contains("dry-humidity")){
        if(humidity<=45){
            humidityWarning.innerHTML = "It's dry out!";
            warningOverlay.appendChild(humidityWarning);
            alertVisible(alertIcon);
        }
        else{
            return;
        }
    }
    //The user stated they dislike moist air
    else if(prefDiv.classList.contains("wet-humidity")){
        if(humidity>=80){
            humidityWarning.innerHTML = "It's moist out!";
            warningOverlay.appendChild(humidityWarning);
            alertVisible(alertIcon);
        }
        else{
            return;
        }

    }
    //The user stated they don't care about humidity
    else{
        return;
    }
    
}

/**
 * * On account creation or during settings changes, the user states their preferences regarding rain. 
 * According to this, rain alerts may appear.
 * @param {*} rainfall The rainfall (in mm) of the hour being checked
 * @param {*} prefDiv A div which holds all the user preferences in HTML format
 * @param {*} warningOverlay An overlay which can be displayed if there is an alert, and will give an actual reason for warning
 * @param {*} alertIcon A red exclamation mark which appears if there is a warning. Can be hovered over to display more info.
 * @returns 
 */
function rainCheck(rainfall, prefDiv, warningOverlay, alertIcon){
const rainWarning = document.createElement("p");

//The user stated they get bothered by even a little bit of rain
if(prefDiv.classList.contains("low-rain")){
    if(rainfall>0){
        rainWarning.innerHTML = "Rain Warning";
        warningOverlay.appendChild(rainWarning);
        alertVisible(alertIcon);
    }
    else{
        return;
    }
}
//The user stated they only get bothered by strong rain
else if(prefDiv.classList.contains("heavy-rain")){
    if(rainfall>7){
        rainWarning.innerHTML = "Heavy Rain.";
        warningOverlay.appendChild(rainWarning);
        alertVisible(alertIcon);
    }else{
        return;
    }
}
//The user stated they don't get bothered by rain
else{
    return;
}

}
/**
 * * On account creation or during settings changes, the user states their preferences regarding wind. 
 * According to this, wind alerts may appear.
 * @param {*} wind The wind speed(kp/h) of the hour being checked
 * @param {*} prefDiv A div which holds all the user preferences in HTML format
 * @param {*} warningOverlay An overlay which can be displayed if there is an alert, and will give an actual reason for warning
 * @param {*} alertIcon A red exclamation mark which appears if there is a warning. Can be hovered over to display more info.
 * @returns 
 */
function windCheck(wind, prefDiv, warningOverlay, alertIcon){
const windWarning = document.createElement("p");
windWarning.innerHTML = "Strong Winds";

if(prefDiv.classList.contains("strong-wind")){
    if(wind>35){
        warningOverlay.appendChild(windWarning);
        alertVisible(alertIcon);
    }
    else{
        return;
    }
}else{
    return;
}
}




///////////////////////////////////////////ACCOUNT CREATION/LOGIN/SETTINGS RELEVANT CODE////////////////////////////////////////////////


/**
 * Reveals the account creation overlay
 */
function openCreateAccount(){
    document.querySelector(".create-account-overlay").style.height = "100%";
    //If the login overlay is open already, then close it.
    if( document.querySelector(".login-account-overlay").style.width == "50%"){
        closeLogin();
    }
}

/**
 * Closes the account creation overlay
 */
function closeCreateAccount(){
    document.querySelector(".create-account-overlay").style.height = "0%";
}

/**
 * Reveals the Login overlay
 */
function openLogin(){
    document.querySelector(".login-account-overlay").style.width = "50%";
}

/**
 * Closes the login overlay
 */
function closeLogin(){
    document.querySelector(".login-account-overlay").style.width = "0%";
}

/**
 * Reveals the Settings overlay
 */
function openSettings(){
    document.querySelector(".settings-overlay").style.height = "100%";
}

/**
 * Closes the settings overlay
 */
function closeSettings(){
    document.querySelector(".settings-overlay").style.height = "0%";

}

/**
 * Performs the logout function and redirects to the homepage with a fresh session
 */
function logOut(){
    window.location.href = "logout_action.php";
}


/**
 * Checks if user is logged in already or not. (If a log-in button exists on the page,
 * the user is not yet logged in.
 * @returns True if user is logged in, False if not.
 */
 function checkLoggedIn(){
    if(document.querySelector(".login-button")){
        return false;
    }
    return true;
}

//If logged in, make the settings and logout buttons work.
if(checkLoggedIn()){
    const logoutButton = document.querySelector(".logout-button");
    const settingsButton = document.querySelector(".settings");
    const closeSettingsButton = document.querySelector("#close-settings-button");
    
    logoutButton.addEventListener("click", logOut);
    settingsButton.addEventListener("click", openSettings);
    closeSettingsButton.addEventListener("click", closeSettings);
    }
    //If not, make the login and create account buttons work.
    else{
    const loginButton = document.querySelector(".login-button");
    const closeLoginButton = document.querySelector("#close-login-button");
    const createAccountButton = document.querySelector(".create-account-button");
    const closeCreateButton =document.querySelector("#close-create-button");
    
    createAccountButton.addEventListener("click", openCreateAccount);
    closeCreateButton.addEventListener("click", closeCreateAccount);
    loginButton.addEventListener("click", openLogin);
    closeLoginButton.addEventListener("click", closeLogin);
    }


//Start the app off by defaulting to searching for Wellington's weather
fetchWeather("Wellington");
