# gotWind

https://igotwind.netlify.app/

Cornwall surf spots weather information app. Provides the weather and distance information for 68 knows Cornwall surf beaches. It uses the user's location input to calculate the distance to all locations.

App displays wind speed ( in knots ) and wind direction for each spot and based on user's skill level ( novice, intermediate or expert ), it offers conditions analyisis output using the following criteria:

User level: Novice
windSpeed > 0 && windSpeed < 5 conditions : "calm";
windSpeed > 5 && windSpeed < 10 conditions : "ok";
windSpeed > 10 && windSpeed < 15 conditions : "good";

User level: Intermediate
windSpeed > 0 && windSpeed < 5 conditions : "calm";
windSpeed > 5 && windSpeed < 15 conditions : "ok";
windSpeed > 15 && windSpeed < 20 conditions : "good";

User level: Expert"
windSpeed > 0 && windSpeed < 15 conditions : "calm";
windSpeed > 15 && windSpeed < 20 conditions : "ok";
windSpeed > 20 conditions : "good";

App is built as a part of the application for [Falmouth Launchpad](https://falmouthlaunchpad.co.uk/);

### Running site locally

Due to the nature of env variables stored using serverless lambda functions, running site locally can be complicated. If needed, however following steps should work:

1. git clone https://github.com/tacotoemeck/iGotWind.git
2. cd iGotWind
3. Generate Open weather API key https://openweathermap.org/api
4. In `./function/getWeatherData/getWeatherData.js`
   Replace:
   `const { WEATHER_API } = process.env`
   with:
   `const WEATHER_API = yourLocationIQAPIkey`
5. Generate LocationIQ API key https://locationiq.com/
6. In `./function/getCurrentAddress/getCurrentAddress.js` AND
   `./function/fetchAddress/fetchAddress.js` AND
   `./function/getDistances/getDistance.js` AND
   `./function/searchAddress/searchAddress.js`
   Replace:
   `const { LOCATION_IQ } = process.env;`
   with:
   `const LOCATION_IQ = yourOpenWeatherAPIkey`
7. Generate LocationIQ API key https://openweathermap.org/api
8. run npm install
9. run npm start

### User Stories:

- [x] As a Surfer, I expect to be able to set my level of expertise to Novice, Intermediate or Expert.
- [x] As a Novice Surfer, I expect that the quality of a spot to be considered to increase with higher winds up to 15 knots, and then decrease up to 20 knots, after which the
      quality should be the same as that of a calm day.
- [x] As an Intermediate Surfer, I expect the quality of the spot to increase with higher speeds up to 20 knots, and then decrease up to 25ft, after which the quality should
      be the same as that of a calm day.
- [x] As an Expert Surfer, I expect the quality of the spot to always increase with higher
      winds.
- [x] As a Surfer, I need to see the best spot for surfing for today.
- [ ] As a Surfer, I can select my current location and find the nearest spot by distance in the top 25% of spots (calculate using Great Circle distances).
- [ ] As a Surfer, I can select my current location and find the best spot within a specified distance.
- [x] As a Surfer, my current location can be automatically determined (using the HTML5 geolocation API for example).
- [ ] As a Surfer, I can select my current location and find the nearest spot by drive time in the top 25% of spots (can use the Google Directions API or the Google Distance Matrix API for this).
- [x] As a Surfer, I can select my current location and find the best spot within aspecified driving time.

### Comments:

I have not managed to get all of the user stories in time. I have encountered issues with site deployement ( lambda functions ) which costed me half a day. As a result I got delayed and ran out of time to complete the remaining tasks.

### Stack used:

- React
- HMTL/CSS
- JavaScript
- Styled Components
- React hooks
- Material UI
- Material Table

#### APIs

- OpenWeatherAPI
- LocationIQ

#### Deployed

- Netlify
- Netlify lambda functions ( hide API keys )

#### Natlify serverless functions

Due to the time restriction, I have decided to run the app on the serverless Netlify functions. This is quick an convinient way to store API keys without a need of createing a seperate server. It does however complicate running app locally as the user needs to connect to a registered Netlify account in order to retrive the variables.

## Bugs // Issues

Weather data :-1:

- Current solution to fetch weather data does not work correctly. Code can be found in `TableContainer.js` inside of the `useEffect` . This is likely caused by use of 2 seperate fetch requests ( one for weather data , second one for the distance to the location ). I have used a recursive method of fetching data to space the requests due to API requirements ( only 2 requests per second ). Functionality works initially but as number of requests grow API seems to be returning same values for multiple requests. This could not be fixed in time for delivery.

Get Current Location :-1:

- Does not work on mobile
- Only tested on Chrome

Tests :-1:

- No tests have been written due to limited time. This is likely causing a larger number of unidentified bugs.

Running site locally

- Using netlify functions to run API fetch calls serverless brings the benefit of the ability to hide the API keys from the front end. The site does, however, relies on netlify environment variables to access the keys. This complicates running the site locally as each variable would have to be replaced with an API key.

### Time Spent

Design/Research: 2h
Building application: 8h
Debugging: Stopped count

### Development Process

1. Figma sketches
   ![](https://i.imgur.com/zM8hMvc.png)
2. Creating a flow chart of a user journey
3. Stack research
4. Start a repo - log issues to the kanban project board
5. Style guide

```
Fonts:
Roboto
Lato

Colour Pallet https://www.design-seeds.com/category/wander/sea/page/3/
#DEEAF0
#ABD2D9
#5C6164
#D6CABC
#EAE4DC
#F0EFEA
```

6. Development and deployment
7. Debugging

### Final thoughts / comments

I need to admit, I feel I could have done better. I have encountered a few setbacks which slowed me down and not allowed to deliver the functionality I was planning. Although not required, I decided to have the site deployed on netlify and use netlify serverless functions to hive the API keys. Due to the silly error of not noticing that the terminal was logged into another netlify account, I have spent a few hours trying to get it working correctly.

Fetch function mentioned in the bugs/issues section also needs to be rewritten. 2 fetch calls should be split into separate functions and called independently.

#### If given more time, I would:

- Fix fetch function in `TableContainer.js` inside of the `useEffect`
- Fix 'get current location' on mobile and other browsers
- Write tests
- Fulfill remaining user stories
- Write better readme
