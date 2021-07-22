# Demonstration code for deno.

Serves news and weather for Málaga (or the city configured in config.js).

The point is to consume and serve endpoints.

We use opine (a framework imitating Node's express) and fetch (built-in function like the one used in browsers).


## Prepare

Copy config.js.in as config.js and fill the api keys.

## Run

deno deno run --allow-net --allow-read ./server.js

