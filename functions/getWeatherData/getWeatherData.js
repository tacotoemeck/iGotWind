const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const { WEATHER_API } = process.env; // .env from netlify are not working FIX!!!!
  const COORDS = event.queryStringParameters.COORDS;
  const COORDS_OBJ = JSON.parse(COORDS);
  const LATITUDE = COORDS_OBJ.LATITUDE;
  const LONGITUDE = COORDS_OBJ.LONGITUDE;

  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${WEATHER_API}`,
    )
      .then((res) => {
        if (res.ok) {
          // res.status >= 200 && res.status < 300
          return res.json();
        } else {
          resolve({ statusCode: res.status || 500, body: res.statusText });
        }
      })
      .then((data) => {
        const response = {
          statusCode: 200,
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        };
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        resolve({ statusCode: err.statusCode || 500, body: err.message });
      });
  });
};
