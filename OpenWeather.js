import { API_WEATHER, LANG, UNITS } from './config.js';
const {
    OpenWeather: { APIKEY, APIURL },
} = API_WEATHER;

export class OpenWeather {
    constructor() {
        this.buildEndpoint();
    }

    buildEndpoint() {
        this.endpoint = `https://${APIURL}?appid=${APIKEY}&lang=${LANG}&units=${UNITS}&q=`;
    }

    async fetch(cityCode) {
        const fullEndpoint = this.endpoint + cityCode;
        console.debug(fullEndpoint);
        
        const res = await fetch(fullEndpoint);
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    }

    static buildWeatherMessage(weather) {
        return `Hace ${weather.weather[0].description} y ${Math.round(weather.main.temp)}ºC en ${weather.name}`;
    }
}
