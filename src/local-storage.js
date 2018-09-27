export const loadAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('authToken', authToken);
    } catch (e) {}
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {}
};

// weather

export const loadWeather = () => {
    console.log(localStorage.getItem('weather'))
    return localStorage.getItem('weather');
}

export const saveWeather = weather => {
    try {
        localStorage.setItem('weather', weather);
    } catch (e) {}
};
