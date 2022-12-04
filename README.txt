IMPORTANT: YOU CAN HOVER OVER THE RED EXCLAMATION MARKS TO SEE YOUR PERSONALIZED WEATHER WARNINGS! 

!!!(If you login and you don't have any at all, try searching for a more relevant city 
!!!((if you said you dislike rain, look for somewhere where it's actually raining)). 
!!!If on account creation you said that you don't burn and that you don't care about humidity, wind and rain, you will not get any warnings.
!!!!What would you need to be warned about?


ALSO IMPORTANT: MY FREE TRIAL FOR THE WEATHER API RUNS OUT BY THE 30TH OF DEC PLEASE MARK THIS BEFORE IT RUNS OUT PRETTY PLEASE!

Functionalities.

(While logged out-> The simpler stuff)
1. Search weather 
  -> API used in JS to collect weather data. HTML, CSS and PHP are used to display this information on the screen in a (hopefully)
     aesthetically pleasing and logical manner. 
  -> Error given if invalid city is searched for. 
  -> Background changes depending on the local time of the city searched.
  -> A lot of JS went into using the very strictly formatted JSON file I got from the weather API and transforming it into something
     I could actually use in the way I wanted to. 

2. Log In 
  -> If you already have a username and password you can log in.
  -> Log-in overlay+animation used instead of bringing you to a separate page
  -> If info given is incorrect then you are taken to an error page.
  -> If info given is correct then you are taken back to the home page but with more functionalities now (explained below).
  *Some existing accounts are usernames josh, deb, baramey with passwords 123, 456, 789 respectively

3. Create account
  -> Create account overlay + animation used instead of loading up a separate page for ease of use.
  -> Input settings prevent users from being able to give usernames/passwords higher than my database's VARCHAR limits. 
    They also force all needed data to be filled out.
  -> If a pre-existing username is used then you will be led to an error page.
  -> Username, Password are saved to one table, Preferences regarding weather are saved to another.
  -> User is automatically signed in on account creation.

(While logged in -> More complex stuff)

4. Personalized Weather Alerts
   -> On log-in, the user's weather preferences are extracted from a database. These preferences are inserted into a hidden HTML div
      and then used by JavaScript to display tailored weather warnings for the user when they may need it.
      (I have recently been made aware of Ajax and how that can let PHP talk to JavaScript. I figured that since I only had 4 session 
      variables I needed JavaScript to see though, that I could get away with using HTML as a 'middle-man' between PHP and JavaScript.)
   -> Each 'weather card (the big one in the center and the hourly weather cards below it)' is actually made up of a grid display with 
      1 column and 1 row. With a 'warning' overlay of opacity 0 and then the normal visible card. I've found grid display here to be a 
      super easy and effective way of letting you stack things on top of each other without specifying actual co-ordinates.
   -> Hovering over the alerts reveal the previously hidden warning overlays. (This was done in JavaScript)

5. Customize settings
   -> On login, all weather preferences are saved in session variables. When you open the settings overlay, the user's preferences are all
      preselected. 
   -> Weather preferences in the database can be updated here. This changes the session variables, which I've made change the HTML, which 
      JS then uses to display HTML/CSS things (alerts), which have functionailities brought on by more JS. (All 5 'languages' are used 
      conjunctionally in a meaningful way for a practical and dynamic functionaility here)
   -> Settings is shown using an overlay which is very similar to the Account Creation overlay. However, there are small differences. 
      I use the 'cascading' nature of CSS to apply a bunch of things to both overlays at first, and then after that in the CSS I make 
      tweaks using more specific selectors(i.e - CSS is actually ordered in a way for a reason and things aren't completely randomly dumped in.
      Well, there are like a few random ones but I know that their order doesn't affect things).

6. Log-out 
   -> Destroys session.

Things to note:
->I made 'sufficient' use of flexboxes. If you see a div inside another div it's most likely because I wanted to use flexbox properties.
->I considered using Ajax for my 4 session variables I want JS to access, but I kind of wanted to show that I understood on a fundamental level
how to link all 5 thigns taught to us? I hope this doesn't bite me in the butt.
->Right now I'm just putting all my things in a ZIP folder with the SQL database separate and hoping for the best. If this doesn't work I've 
uploaded it wrong. Please tell me if this is the case and I can try fix my upload or just let you see the app on my laptop?
->A lot of the basic PHP session stuff is just a rip and then extension of the code Michael/Ali showed. 