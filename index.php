<!--PHP SETUP-->
<?php session_start(); 

//Function used to check if a user is signed in or not.
function checkSignIn(){
    if(isset($_SESSION['username'])){
    return true;
    }
  } 

//Assigning session variables to normal variables so writing is easier later
       if(checkSignIn()){
        $username = $_SESSION['username'];
        $uv_p = $_SESSION['uv_pref'];
        $humidity_p = $_SESSION['humidiy_pref'];
        $rain_p = $_SESSION['rain_pref'];
        $wind_p = $_SESSION['wind_pref']; }  ?>


<!--HTML STARTS HERE-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Josh's Weather App</title>

    <!--CSS-->
    <!--Reset CSS first to get rid of some browser quirks-->
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="styles.css">
</head>

<!--I tried to get all my tags to line up with their closing tags?-->
<body>

<!--Setting Menu Overlay 39~119-->
<div class="settings-overlay">
  <img src="./SVG/close.svg" alt="Close" id="close-settings-button">
  <form action="settings_action.php" method="POST">
    <div class="settings-page-content">
        <h1>Customize Your Weather Preferences!</h1>
        <div class="notif-grid">
            <div class="uv-grid">
                <img src="./SVG/sun.svg">
                <div>
                    <div>
                      <input type="radio" id="noburn" name="uv-radio-update" value="noburn" required <?php if($uv_p=="noburn"){echo "checked";}?>>
                      <label for="noburn">I don't sunburn</label>
                    </div>
                    <div>
                      <input type="radio" id="lessburn" name="uv-radio-update" value ="lessburn" required <?php if($uv_p=="lessburn"){echo "checked";}?>>
                      <label for="lessburn">It takes me >4 hours in the sun to burn</label>
                    </div>
                    <div>
                      <input type="radio" id="someburn" name="uv-radio-update" value="someburn" required <?php if($uv_p=="someburn"){echo "checked";}?>>
                      <label for="someburn">It takes me 1~4 hours to sunburn </label>
                    </div>
                    <div>
                      <input type="radio" id="muchburn" name="uv-radio-update" value="muchburn" required <?php if($uv_p=="muchburn"){echo "checked";}?>>
                      <label for="muchburn">I burn after 30 minutes in the sun </label>
                    </div>
                    <div>
                      <input type="radio" id="fullburn" name="uv-radio-update" value="fullburn" required <?php if($uv_p=="fullburn"){echo "checked";}?>>
                      <label for="fullburn">I burn in less than 30 minutes</label>
                    </div>
                </div>
            </div>
            <div class="humidity-grid">
                <img src="./SVG/cloud.svg">
                <div>
                    <div>
                    <input type="radio" id="dry-humidity" name="humidity-radio-update" value="dry-humidity" required <?php if($humidity_p=="dry-humidity"){echo "checked";}?>>
                      <label for="dry-humidity">Dry air bothers me</label>
                    </div>
                    <div>
                      <input type="radio" id="wet-humidity" name="humidity-radio-update" value="wet-humidity" required <?php if($humidity_p=="wet-humidity"){echo "checked";}?>>
                      <label for="wet-humidity">Moist air bothers me</label>
                    </div>
                    <div>
                      <input type="radio" id="dontcare-humidity" name="humidity-radio-update" value="dontcare-humidity" required <?php if($humidity_p=="dontcare-humidity"){echo "checked";}?>>
                      <label for="wet-humidity">I don't care about humidity</label>
                    </div>
                </div>
            </div>
            <div class="rain-grid">
                <img src="./SVG/rain.svg">
                <div>
                    <div>
                      <input type="radio" id="low-rain" name="rain-radio-update" value="low-rain" required <?php if($rain_p=="low-rain"){echo "checked";}?>>
                      <label for="low-rain">Even a bit of rain bothers me</label>
                    </div>
                    <div>
                      <input type="radio" id="heavy-rain" name="rain-radio-update" value="heavy-rain" required <?php if($rain_p=="heavy-rain"){echo "checked";}?>>
                      <label for="heavy-rain">Only heavy rain bothers me</label>
                    </div>
                    <div>
                      <input type="radio" id="dontcare-rain" name="rain-radio-update" value="dontcare-rain" required <?php if($rain_p=="dontcare-rain"){echo "checked";}?>>
                      <label for="dontcare-rain">Rain doesn't bother me</label>
                    </div>

                </div>
            </div>
            <div class="wind-grid">
                <img src="./SVG/wind.svg">
                <input type="radio" id="windcheck" name="wind-radio-update" value="strong-wind" required <?php if($wind_p=="strong-wind"){echo "checked";}?>>
                <label for="windcheck">Strong winds bother me</label>
                <input type="radio" id="windcheck" name="wind-radio-update" value="no-wind" required <?php if($wind_p=="no-wind"){echo "checked";}?>>
                <label for="windcheck">I don't care about wind</label>
                
            </div>
        </div>
         <button type="submit" class="transparent-button"> 
            <div class="confirm-settings">Confirm Settings</div>
         </button> 
    </div>
  </form>
</div>

<!--Account Creation Overlay 122 ~212 -->
<div class="create-account-overlay">
  <img src="./SVG/close.svg" alt="Close" id="close-create-button">
  <form action="register_action.php" method="POST">
    <div class="create-account-content">
        <h1>Create an account!</h1>
        <div class="user-pass">
            <div>
              <input type="text" name="username" placeholder="Username" required>
              <label for="username">Username</label>
            </div>
             <div>
               <input type="password" name="password" placeholder="Password" required>
               <label for="password">Password</label>
             </div>  
        </div>
        <div class="notif-grid">
            <div class="uv-grid">
                <img src="./SVG/sun.svg">
                <div>
                    <div>
                      <input type="radio" id="noburn" name="uv-radio" value="noburn" required>
                      <label for="noburn">I don't sunburn</label>
                    </div>
                    <div>
                      <input type="radio" id="lessburn" name="uv-radio" value ="lessburn" required>
                      <label for="lessburn">It takes me >4 hours in the sun to burn</label>
                    </div>
                    <div>
                      <input type="radio" id="someburn" name="uv-radio" value="someburn" required>
                      <label for="someburn">It takes me 1~4 hours to sunburn </label>
                    </div>
                    <div>
                      <input type="radio" id="muchburn" name="uv-radio" value="muchburn" required>
                      <label for="muchburn">I burn after 30 minutes in the sun </label>
                    </div>
                    <div>
                      <input type="radio" id="fullburn" name="uv-radio" value="fullburn" required>
                      <label for="fullburn">I burn in less than 30 minutes</label>
                    </div>
                </div>
            </div>
            <div class="humidity-grid">
                <img src="./SVG/cloud.svg">
                <div>
                    <div>
                    <input type="radio" id="dry-humidity" name="humidity-radio" value="dry-humidity" required>
                      <label for="dry-humidity">Dry air bothers me</label>
                    </div>
                    <div>
                      <input type="radio" id="wet-humidity" name="humidity-radio" value="wet-humidity" required>
                      <label for="wet-humidity">Moist air bothers me</label>
                    </div>
                    <div>
                      <input type="radio" id="dontcare-humidity" name="humidity-radio" value="dontcare-humidity" required>
                      <label for="wet-humidity">I don't care about humidity</label>
                    </div>
                </div>
            </div>
            <div class="rain-grid">
                <img src="./SVG/rain.svg">
                <div>
                    <div>
                      <input type="radio" id="low-rain" name="rain-radio" value="low-rain" required>
                      <label for="low-rain">Even a bit of rain bothers me</label>
                    </div>
                    <div>
                      <input type="radio" id="heavy-rain" name="rain-radio" value="heavy-rain" required>
                      <label for="heavy-rain">Only heavy rain bothers me</label>
                    </div>
                    <div>
                      <input type="radio" id="dontcare-rain" name="rain-radio" value="dontcare-rain" required>
                      <label for="dontcare-rain">Rain doesn't bother me</label>
                    </div>

                </div>
            </div>
            <div class="wind-grid">
                <img src="./SVG/wind.svg">
                <input type="radio" id="windcheck" name="wind-radio" value="strong-wind" required>
                <label for="windcheck">Strong winds bother me</label>
                <input type="radio" id="windcheck" name="wind-radio" value="no-wind" required>
                <label for="windcheck">I don't care about wind</label>
                
            </div>
        </div>
        <button type="submit" class="transparent-button"> 
            <div class="confirm-create">Create Account</div>
        </button> 
    </div>
  </form>
</div>

<!--Login Overlay 215~232-->
<div class="login-account-overlay">
    <img src="./SVG/close.svg" alt="Close" id="close-login-button">
    <form action="login_action.php" method="post">
      <h1>Welcome back</h1>

      <div class="login-content">
          <input type="text" name="loginuser" maxlength="40">
          <label for="loginuser">Username</label>
          <input type="password" name="loginpass" maxlength="40">
          <label for="loginpass">Password</label>
          <button type="submit" class="transparent-button">
            <div class="confirm-login">Login</div>
          </button>
        

      </div>
    </form>
</div>

<!--Main Screen Content 235~311-->
<div class="main-content">
    <div class="top-icons">
      <?php if(checkSignIn())
      {echo "<div class=\"settings\">Settings</div>";}
      else{
        echo "<div>Log in to access personalized alerts!</div>";
      }?>
        
        <div class="profile-buttons">
           <?php if(checkSignIn()){
            echo "<div class='logout-button'>Logout</div>";
           }
           else{
            echo "<div class='login-button'>Login</div>
            <div class='create-account-button'>Create Account</div>";
           } ?>

            
        </div>
    </div>
      <div class="bigCard_and_icon">
          <div class="alert big">
                <img src="./SVG/alert.svg" alt="!!!">
          </div>
          <div class="bigcard_overlay_grid">
             <div class="bigcard_overlay warning_overlay"></div>
             <div class="bigCard" >

               <h1 class="weatherTitle">Wellington Weather</h2>

               <div class="weatherInfo">
                  <img src="./SVG/sun.svg" alt="Sunny" class="weatherIcon svg" >
            
                  <div class="weatherText">
                    <p id="temperature">18°</p>
                    <p id="description">Sunny</p>
                    <p id="uv">UV Index: 10</p>
                    <p id="wind">Wind Speed: 10 km/h</p>
                  </div>
               </div>

               <div class="inputDiv">
                   <input type="text" id="searchCity" placeholder="Enter a city name">
                       <button class="searchCityButton"><svg width="100%" height="100%" viewBox="0 0 532 533" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                           <g transform="matrix(1,0,0,1,-75,-21)">
                           <path d="M401.67,114.89C341.811,55.031 244.76,55.031 184.9,114.89C125.04,174.749 125.041,271.8 184.9,331.66C244.759,391.52 341.81,391.519 401.67,331.66C461.53,271.801 461.529,174.75 401.67,114.89ZM160.15,90.144C233.677,16.613 352.89,16.613 426.42,90.144C495.775,159.499 499.713,269.504 438.225,343.474L461.159,366.404C483.932,354.232 512.882,357.748 532.089,376.955L577.37,422.236C600.878,445.744 600.878,483.857 577.37,507.365C553.862,530.873 515.749,530.873 492.241,507.365L446.96,462.084C427.753,442.877 424.237,413.928 436.409,391.154L413.479,368.22C339.51,429.708 229.509,425.771 160.149,356.415C86.618,282.888 86.618,163.675 160.149,90.145L160.15,90.144ZM507.34,401.694C497.5,391.854 481.547,391.854 471.707,401.694C461.867,411.534 461.867,427.487 471.707,437.327L516.992,482.612C526.832,492.452 542.785,492.452 552.625,482.612C562.465,472.772 562.465,456.819 552.625,446.979L507.34,401.694Z"/>
                           </g>
                           </svg>
                       </button>
               </div>
             </div>
      
         </div>
      </div>

    <div class="scroller-container">
      <div class="weather-scroller">
        <?php for($i = 0; $i<24; $i++) {  ?>
          <div class="icon_and_alert">
              <div class="alert">
                <img src="./SVG/alert.svg" alt="!!!">
              </div>
              <div class="hour-overlay-grid">
                  <div class="hour-overlay warning_overlay"></div>
                  <div class="hour">
                      <p class="time">12:00</p>
                      <img src="./SVG/cloud.svg" alt="cloudy" class="mini-icon">
                      <p class="temp">7</p>
                  </div>
              </div> 
          </div>
        <?php } ?>
       
     </div>
    </div>
 
</div>

<!--I don't know how to directly connect my session variables with JS. My solution is to
  have PHP tell HTML my variables and then JS can look at the HTML. (It's sunday now and I know of Ajax. I think this works fine
  for now as it is quite a small scale and it shows that I can link PHP and Javascript in a basic way)-->
<div class="session-variables">
  <?php if(checkSignIn()){ echo "<div class='$uv_p $humidity_p $rain_p $wind_p' ></div>";} ?>
</div>


  <script src="script.js" ></script>
</body>
</html>