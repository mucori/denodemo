import { opine } from "./deps.js";

import { OpenWeather } from './OpenWeather.js';
import { NewsApi } from './NewsApi.js';

import {
    CITY,
    PORT,
} from './config.js';


const app = opine();
const weatherProvider = new OpenWeather();
const newsProvider = new NewsApi();

app.get("/weather", (req, res) => {
    weatherProvider.fetch(CITY).then((weather) => {
        res.setStatus(200).json(
            OpenWeather.buildWeatherMessage(weather)
        );
    }).catch((err) => {
        console.error('error fetching');
        console.error(err);
        res.setStatus(500).json(err.message);
    });
});

app.get("/whatsup", (req, res) => {
    const weatherPromise = weatherProvider.fetch(CITY).then((weather) => {
        return OpenWeather.buildWeatherMessage(weather);
    });
    const newsPromise = newsProvider.fetch(CITY, 1).then((news) => {
        return news.totalResults ?
            { title: news.articles[0].title, url: news.articles[0].url } :
            null;
    });

    Promise.all([weatherPromise, newsPromise]).then(results => {
        res.setStatus(200).json({
            weather: { message: results[0] },
            news: results[1],
        });
    }).catch((err) => {
        console.error('error fetching');
        console.error(err);
        res.setStatus(500).json(err.message);
    });
});

// Start our server on the desired port.
app.listen(PORT);

console.log(`API server running on port ${PORT}`);
