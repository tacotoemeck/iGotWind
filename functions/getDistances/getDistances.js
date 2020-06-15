const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const { LOCATION_IQ } = process.env; // .env from netlify are not working FIX!!!!
  const COORDS = event.queryStringParameters.COORDS;
  const COORDS_OBJ = JSON.parse(COORDS);
  const CURRENT_LATITUDE = COORDS_OBJ.CURRENT_LATITUDE;
  const CURRENT_LONGITUDE = COORDS_OBJ.CURRENT_LONGITUDE;
  const DESTINATION_LATITUDE = COORDS_OBJ.DESTINATION_LATITUDE;
  const DESTINATION_LONGITUDE = COORDS_OBJ.DESTINATION_LONGITUDE;

  return new Promise((resolve, reject) => {
    fetch(
      `https://eu1.locationiq.com/v1/directions/driving/${CURRENT_LONGITUDE},${CURRENT_LATITUDE};${DESTINATION_LONGITUDE},${DESTINATION_LATITUDE}?key=${LOCATION_IQ}&overview=false`,
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
