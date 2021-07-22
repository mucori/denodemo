import { API_NEWS, LANG } from './config.js';
const {
    NewsApi: { APIKEY, APIURL },
} = API_NEWS;

export class NewsApi {
    constructor() {
        this.buildEndpoint();
    }

    buildEndpoint() {
        this.endpoint = `https://${APIURL}?apiKey=${APIKEY}&language=${LANG}&sortBy=publishedAt&q=`;
    }

    async fetch(cityCode, pageSize) {
        let fullEndpoint = this.endpoint + cityCode;
        if (pageSize) {
            fullEndpoint += `&pageSize=${pageSize}`;
        }
        console.debug(fullEndpoint);
        
        const res = await fetch(fullEndpoint);
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    }
}
