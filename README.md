# WeatherFM
A playlist app that generates mood music based on the weather in your area ☀️🎶⛅🎶☁️
[![Build Status](https://www.travis-ci.org/thinkful-ei22/WeatherFM-Client-PurpleCobras.png)](https://www.travis-ci.org/thinkful-ei22/WeatherFM-Client-PurpleCobras)

## Link to deployed version on Heroku:
https://weatherfm-client.herokuapp.com/

```
Demo Account

Username: demo
password: demopassword
```

## Features

### Discover
The discover feature allows users to generate music that reflects the weather.  While on the discover page, users can choose to add a song to that specific weather playlist, go the next song or the previous song.  There are also advanced settings that allow the user to tweak the discover songs by adjusting song attributes like happiness, popularity and danceability.

### Playlists
While listening to the discover page, users can add songs to their personal weather playlists.  When a user is on the playlists page, they can choose a weather playlist, add, remove and play songs from it.  We have also further integrated WeatherFM with Spotify, so for users with a spotify account, they can login into their account from WeatherFM and export their custom weather playlists to their own Spotify account.

### Customization
Regardless of a users location or the current weather, they can access all of their different weather playlists as well as use the discover feature.  By changing the current weather, users can generate rainy day playlists when its sunny outside.  Similarly, if a user does not want to share their location, or wants to discover music for another weather, they can manually set the weather.

## Screenshots
### Discover Page
![Discover Page](./screenshots/Discover.png)

### Playlist Page
![Playlist Page](./screenshots/Playlist.png)

### On-Boarding
![On-boarding Page](./screenshots/Onboarding.png)

### Custom Discover Settings
![Slider Page](./screenshots/Slider.png)

### Registration
![Landing Page](./screenshots/LandingPage.png)

## Target Audience
Anyone looking to find music that reflects nature's mood.

## Server Repo
https://github.com/thinkful-ei22/WeatherFM-Backend-PurpleCobras

## Tech Stack
WeatherFM uses React.js, Enzyme/Jest for the client, and Node.js, MongoDB, Mongoose, Mocha/Chai for the backend.  WeatherFM also utilizes, Spotify, Youtube and OpenWeather's external APIs. 

## Future Plans
We would like to change our music player, so instead of playing youtube videos, our discover and playlist pages just play audio.

## Creators
Kaitlin Bunn, Brandon Graham, Kevin Tsang, Filipp Gorbunov, Ian Beihl
