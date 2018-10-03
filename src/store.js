import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken, loadWeather} from './local-storage';
import authReducer from './reducers/auth';
import protectedDataReducer from './reducers/protected-data';
import {setAuthToken, refreshAuthToken} from './actions/auth';
import weatherReducer from './reducers/weather';
import playlistReducer from './reducers/playlists';
import youtubeReducer from './reducers/youtube';
import { setWeather } from './actions/weather';
import spotifyReducer from './reducers/spotify';
const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        protectedData: protectedDataReducer,
        weather: weatherReducer,
        playlists: playlistReducer,
        youtube: youtubeReducer,
        spotify: spotifyReducer,
    }), composeWithDevTools(
    applyMiddleware(thunk)
));

// Hydrate the authToken from localStorage if it exists
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

// Hydrate the weather from localStorage if it exists
const weather = loadWeather();
// console.log('weather', weather);
if (weather) {
    store.dispatch(setWeather(weather));
}

export default store;
