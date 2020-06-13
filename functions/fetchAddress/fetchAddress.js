const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const { LOCATION_IQ } = process.env; // .env from netlify are not working FIX!!!!
  const COORDS = event.queryStringParameters.COORDS;
  const COORDS_OBJ = JSON.parse(COORDS);
  const LATITUDE = COORDS_OBJ.LATITUDE;
  const LONGITUDE = COORDS_OBJ.LONGITUDE;

  console.log("type of coords are :", typeof JSON.parse(COORDS));
  console.log("LATITUDE are :", LATITUDE);
  console.log("coords_obj are :", COORDS_OBJ);

  return new Promise((resolve, reject) => {
    fetch(
      `https://eu1.locationiq.com/v1/reverse.php?key=51f1e44926d233&lat=${LATITUDE}&lon=${LONGITUDE}&format=json`,
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

// exports.handler = async (event, context) => {
//   const { LOCATION_IQ_KEY } = process.env;
//   const LATITUDE = event.queryStringParameters.LATITUDE;
//   const LONGITUDE = event.queryStringParameters.LONGITUDE;

//   let data = ["location"];

//   console.log("key is : ", LOCATION_IQ_KEY);
//   console.log(" LONGITUDE : ", LONGITUDE);
//   console.log(
//     "fetch is : ",
//     `https://eu1.locationiq.com/v1/reverse.php?key=${LOCATION_IQ_KEY}&lat=${LATITUDE}&lon=${LONGITUDE}&format=json`,
//   );

//   fetch(
//     `https://eu1.locationiq.com/v1/reverse.php?key=${LOCATION_IQ_KEY}&lat=${LATITUDE}&lon=${LONGITUDE}&format=json`,
//   )
//     .then((response) => response.json())
//     .then((data) => console.log(data));

//   try {
//     // console.log("data ", data);
//     return {
//       statusCode: 200,
//       body: JSON.stringify(data[0]),
//       headers: {
//         "content-type": "application/json",
//       },
//     };
//   } catch (err) {
//     return { statusCode: 500, body: err.toString() };
//   }
// };
