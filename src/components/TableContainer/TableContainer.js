import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable from "material-table";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { TableTitleText } from "./TableContainer.style";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";

import Search from "@material-ui/icons/Search";

function identifyConditionsQualityBasedOnUserLevel(windSpeed, userLevel) {
  if (userLevel === "Novice") {
    if (windSpeed > 0 && windSpeed < 5) return "calm";
    if (windSpeed > 5 && windSpeed < 10) return "ok";
    if (windSpeed > 10 && windSpeed < 15) return "good";
  }
  if (userLevel === "Intermediate") {
    if (windSpeed > 0 && windSpeed < 5) return "calm";
    if (windSpeed > 5 && windSpeed < 15) return "ok";
    if (windSpeed > 15 && windSpeed < 20) return "good";
  }
  if (userLevel === "Expert") {
    if (windSpeed > 0 && windSpeed < 15) return "calm";
    if (windSpeed > 15 && windSpeed < 20) return "ok";
    if (windSpeed > 20) return "good";
  }
}

function identifyWindDirection(degrees) {
  var val = Math.floor(degrees / 22.5 + 0.5);
  var arr = [
    "N⬆️",
    "NNE↗️",
    "NE↗️",
    "ENE↗️",
    "E➡️",
    "ESE↘️",
    "SE↘️",
    "SSE↘️",
    "S⬇️",
    "SSW↙️",
    "SW↙️",
    "WSW↙️",
    "W⬅️",
    "WNW↖️",
    "NW↖️",
    "NNW↖️",
  ];
  return arr[val % 16];
}

function DisplayTableContainer(props) {
  const [tableRows, setTableRows] = useState([]);
  const tableIcons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  };
  useEffect(() => {
    let currentLat = props.currentPostCode.lat;
    let currentLon = props.currentPostCode.lon;

    if (props.currentPostCode) {
      let modifiedArray = [...props.allSurfLocationsArray];

      // use recursion to limit number of API calls to 2 per 1 sec max ( due to API limitations )
      function spaceRequests(index) {
        if (index < modifiedArray.length - 1) {
          let copyTableRows = [...tableRows];
          console.log(copyTableRows);
          setTimeout(() => {
            index++;

            const asyncLoop = async () => {
              const fetchWeather = await fetch(
                `../../../.netlify/functions/getWeatherData/getWeatherData.js?COORDS={"LATITUDE":${modifiedArray[index].latitude}, "LONGITUDE":${modifiedArray[index].longitude}}`,
              ).catch(console.error);

              const fetchLocation = await fetch(
                `../../../.netlify/functions/getDistances/getDistances.js?COORDS={"CURRENT_LATITUDE":${currentLat}, "CURRENT_LONGITUDE":${currentLon}, "DESTINATION_LATITUDE":${modifiedArray[index].latitude}, "DESTINATION_LONGITUDE":${modifiedArray[index].longitude}}`,
              ).catch(console.error);

              await fetchWeather
                .json()
                .then((data) => {
                  // convert m per second to knots and round to 2 decimels + wind direction
                  modifiedArray[index].windSpeed =
                    (Number(data.wind.speed) * 1.943844).toFixed(2) +
                    " " +
                    identifyWindDirection(data.wind.deg);

                  // // analyze conditions
                  modifiedArray[
                    index
                  ].conditions = identifyConditionsQualityBasedOnUserLevel(
                    (Number(data.wind.speed) * 1.943844).toFixed(2),
                    props.userLevel,
                  );
                })
                .catch(console.error);

              await fetchLocation
                .json()
                .then((data) => {
                  modifiedArray[index].distance =
                    (Number(data.routes[0].distance) / 1000).toFixed(2) + " km";

                  props.setAllSurfLocationsArray(modifiedArray);
                  console.log("modifiedarray is :", modifiedArray);
                  setTableRows(copyTableRows);
                })
                .catch((error) => {
                  console.log(error);
                });
            };

            asyncLoop();
            // set the function to send a fetch request every 0.5s so server can handle the requests.
            spaceRequests(index);
          }, 1000);
        }
      }
      spaceRequests(-1);
    }
  }, [props.currentPostCode]);

  return (
    <>
      <TableTitleText>
        click top of the table to sort results based on:
        <br /> distance, quality, wind speed or spot name
      </TableTitleText>
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={[
          {
            title: "Name",
            field: "name",
            cellStyle: {
              backgroundColor: "#ABD2D9",
              color: "#5C6164",
              fontSize: "12px",
              fontWeight: "bold",
              width: 125,
              maxWidth: 125,
              padding: "10px",
            },
            headerStyle: {
              backgroundColor: "#5C6164",
              fontSize: "12px",
            },
          },
          { title: "Distance", field: "distance" },
          { title: "Quality", field: "conditions" },
          {
            title: "Wind",
            field: "windSpeed",
          },
        ]}
        data={props.allSurfLocationsArray}
        options={{
          sorting: true,
          headerStyle: {
            backgroundColor: "#5C6164",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: "12px",
            width: 25,
            maxWidth: 25,
            paddingLeft: "5px",
            paddingRight: "5px",
            textAlign: "center",
          },
        }}
      />
    </>
  );
}

export default DisplayTableContainer;
