import { OpenWeather } from './OpenWeather.js';
import { CITY } from './config.js';

const provider = new OpenWeather();
provider.fetch(CITY).then((weather) => {
    console.log(`Hace ${weather.weather[0].description} y ${weather.main.temp}ºC en ${weather.name}`);
}).catch((err) => {
    console.error('error fetching');
    console.error(err);
});

