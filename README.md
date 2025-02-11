# Weather Dashboard App

This app can be used to find the weather for a given location, by searching for a city name. It displays the current weather and a 3 or 7 day forecast.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## To run project locally

Navigate to the project root and install:

```bash
npm install
```

Then, build with:
```bash
npm run build
```

And start the server with:
```bash
npm run start
```

Or run in dev mode with:
```bash
npm run dev
```

- I implemented a single Next.js api route for weather data fetching as this keeps things simple and allows sharing of utils and types throughout the project.
- I made use of Zod for validation of api data, and inferred most of the types used throughout from Zod schemas, as it gives a single source of truth for types.
- I treated errors as values wherever possible as I think this approach leads to code which is easier to reason about.
- The `WeatherContext` provider abstracts the data fetching logic on the front-end, and also enables weather data to be accessed easily by different components. 
