const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const { LOCATION_IQ } = process.env; // .env from netlify are not working FIX!!!!
  const SEARCH_PARAMS = event.queryStringParameters.SEARCH_PARAMS;

  return new Promise((resolve, reject) => {
    fetch(
      `https://eu1.locationiq.com/v1/search.php?key=${LOCATION_IQ}&q=${SEARCH_PARAMS}&format=json`,
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
