<?php

session_start();

//Connect to Database (Using root and empty string pass because was told that security isn't the focus of this assignment)
$conn = new mysqli("localhost", "root", "", "weather_josh");
if($conn->connect_error){
    echo "error";
    die("Connection failed: " . $conn->connect_error);
}

//Making sure form has been actually filled out.
if(isset($_REQUEST['username']) && isset($_REQUEST['password']) && isset($_REQUEST['uv-radio']) && isset($_REQUEST['wind-radio']) && isset($_REQUEST['humidity-radio']) && isset($_REQUEST['rain-radio'])){

    //Collecting Data
    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];
    $uv = $_REQUEST['uv-radio'];
    $rain = $_REQUEST['rain-radio'];
    $humidity = $_REQUEST['humidity-radio'];
    $wind = $_REQUEST['wind-radio'];

//Checking if username exists already
    $usercheck = "SELECT * FROM `users` WHERE `username` = '$username'";
    $result = $conn->query($usercheck);
           if($result->num_rows>0){
            //If it already exists, the user will be redirected back to the home page.
            echo "<p>That user already exists. Click <a href='index.php'>here</a> to return to the homepage</p>";
        }
            //Preparing queries for inserting data into two different tables. (A user/password table and a user/weather preference table)
            else{

            $queryUsers = $conn->prepare("INSERT INTO `users` (`username`,`password`) VALUES (?,?);");
            $queryWeather = $conn->prepare("INSERT INTO `user_preferences` (`username`,`uv`,`humidity`,`rain`,`wind`) VALUES (?,?,?,?,?);");

            $queryUsers->bind_param("ss", $username, $password);
            $queryWeather->bind_param("sssss", $username, $uv, $humidity, $rain, $wind);

            $queryUsers->execute();
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
            //Login
             $_SESSION['username'] = $username;
             header("Location: index.php");


    }
}

//Error. 
else{
    header("Location: index.php");
} 
?>