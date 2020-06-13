exports.handler = async (event, context) => {
  const { LOCATION_IQ_KEY } = process.env;
  const LATITUDE = event.queryStringParameters.LATITUDE;
  const LONGITUDE = event.queryStringParameters.LONGITUDE;

  let data = ["location"];

  console.log("key is : ", LOCATION_IQ_KEY);

  fetch(
    `https://eu1.locationiq.com/v1/reverse.php?key=${LOCATION_IQ_KEY}&lat=${LATITUDE}&lon=${LONGITUDE}&format=json`,
  )
    .then((response) => response.json())
    .then((data) => console.log(data));

  try {
    // console.log("data ", data);
    return {
      statusCode: 200,
      body: JSON.stringify(data[0]),
      headers: {
        "content-type": "application/json",
      },
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
