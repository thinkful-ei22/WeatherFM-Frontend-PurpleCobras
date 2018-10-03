import React from 'react';
import requiresLogin from './requires-login';
import {Link} from 'react-router-dom';

export function Onboarding (props) {
  return (
    <div>
      <h1>Onboarding Page</h1>

      <form>
        <h3>Add Sunny Tracks</h3>
        <label forHTML="sunnySong1">1. Song Title:</label>
        <input name="sunnySong1"></input>
        <label forHTML="sunnyArtist1"> Artist Name:</label>
        <input name="sunnyArtist1"></input><br />

        <label forHTML="sunnySong2">2. Song Title:</label>
        <input name="sunnySong2"></input>
        <label forHTML="sunnyArtist2"> Artist Name:</label>
        <input name="sunnyArtist2"></input>

        <h3>Add Rainy Tracks</h3>
        <label forHTML="rainySong1">1. Song Title:</label>
        <input name="rainySong1"></input>
        <label forHTML="rainyArtist1"> Artist Name:</label>
        <input name="rainyArtist1"></input><br />

        <label forHTML="rainySong2">2. Song Title:</label>
        <input name="rainySong2"></input>
        <label forHTML="rainyArtist2"> Artist Name:</label>
        <input name="rainyArtist2"></input>

        <h3>Add Cloudy Tracks</h3>
        <label forHTML="cloudySong1">1. Song Title:</label>
        <input name="cloudySong1"></input>
        <label forHTML="cloudyArtist1"> Artist Name:</label>
        <input name="cloudyArtist1"></input><br />

        <label forHTML="cloudySong2">2. Song Title:</label>
        <input name="cloudySong2"></input>
        <label forHTML="cloudyArtist2"> Artist Name:</label>
        <input name="cloudyArtist2"></input>

        <h3>Add Drizzle Tracks</h3>
        <label forHTML="drizzleSong1">1. Song Title:</label>
        <input name="drizzleSong1"></input>
        <label forHTML="drizzleArtist1"> Artist Name:</label>
        <input name="drizzleArtist1"></input><br />

        <label forHTML="drizzleSong2">2. Song Title:</label>
        <input name="drizzleSong2"></input>
        <label forHTML="drizzleArtist2"> Artist Name:</label>
        <input name="drizzleArtist2"></input>

        <h3>Add Snowy Tracks</h3>
        <label forHTML="snowySong1">1. Song Title:</label>
        <input name="snowySong1"></input>
        <label forHTML="snowyArtist1"> Artist Name:</label>
        <input name="snowyArtist1"></input><br />

        <label forHTML="snowySong2">2. Song Title:</label>
        <input name="snowySong2"></input>
        <label forHTML="snowyArtist2"> Artist Name:</label>
        <input name="snowyArtist2"></input>

        <h3>Add Thunderstorm Tracks</h3>
        <label forHTML="thunderstormSong1">1. Song Title:</label>
        <input name="thunderstormSong1"></input>
        <label forHTML="thunderstormArtist1"> Artist Name:</label>
        <input name="thunderstormArtist1"></input><br />

        <label forHTML="thunderstormSong2">2. Song Title:</label>
        <input name="thunderstormSong2"></input>
        <label forHTML="thunderstormArtist2"> Artist Name:</label>
        <input name="thunderstormArtist2"></input><br /><br />

        <button type="submit">Add Songs</button>
        <Link to="/dashboard"><button type="submit">Skip (Go to Dashboard)</button></Link>
      </form><br />
    
    </div>

  )
}

export default requiresLogin()(Onboarding);