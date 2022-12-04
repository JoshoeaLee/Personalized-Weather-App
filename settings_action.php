<?php

session_start();
//Connect to Database (Using root and empty string pass because was told that security isn't the focus of this assignment)
$conn = new mysqli("localhost", "root", "", "weather_josh");
//Check Connection
if($conn->connect_error){
    echo "error";
    die("Connection failed: " . $conn->connect_error);
}

//Getting username 
$username = $_SESSION['username'];

//Collecting New Set Preferences
$uv = $_REQUEST['uv-radio-update'];
$rain = $_REQUEST['rain-radio-update'];
$humidity = $_REQUEST['humidity-radio-update'];
$wind = $_REQUEST['wind-radio-update'];

//Updating settings
$queryWeather = $conn->prepare("UPDATE `user_preferences` SET `uv` = ?,`humidity` = ?,`rain` = ?,`wind` = ? WHERE `username` = ?;");
$queryWeather->bind_param("sssss", $uv, $humidity, $rain, $wind,$username);
$queryWeather->execute();

//Setting weather preferences
$weather_pref = "SELECT * FROM `user_preferences` WHERE `username` = '$username'";
$pref_result = $conn->query($weather_pref);
//Help with while statement for MYSQL stuff https://stackoverflow.com/questions/22176907/php-retrieve-data-from-table-row-and-store-to-variable
while($row = $pref_result->fetch_object()){
    
    $_SESSION['uv_pref'] = $row->uv;
    $_SESSION['humidiy_pref'] = $row->humidity;
    $_SESSION['rain_pref'] = $row->rain;
    $_SESSION['wind_pref'] = $row->wind;
}

//Reload page!
header("Location: index.php");

?>