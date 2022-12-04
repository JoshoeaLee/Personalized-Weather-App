<?php 

session_start();


//Connect to Database (Using root and empty string pass because was told that security isn't the focus of this assignment)
$conn = new mysqli("localhost", "root", "", "weather_josh");
if($conn->connect_error){
    echo "error";
    die("Connection failed: " . $conn->connect_error);
}

//Forces a username and password to be previously placed in the form before to allow this page to be accessed
if(isset($_REQUEST['loginuser']) && isset($_REQUEST['loginpass'])){

    //Collecting Data
    $username = $_REQUEST['loginuser'];
    $password = $_REQUEST['loginpass'];


    //Checking for Username and Password

    $userpasscheck = "SELECT * FROM `users` WHERE 
        `username` = '$username' and `password` = '$password'";

    $result = $conn->query($userpasscheck);

    //If there's match...
    if($result->num_rows>0){

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
       
        $_SESSION['username'] = $username;
        header("Location: index.php");
        
    }
    else{
        echo "<p>Your username or password is not valid. Click <a href='index.php'>here</a> to return to the home page</p>";
    }


}else{
    //Error
    header("Location: index.php");
}
?>