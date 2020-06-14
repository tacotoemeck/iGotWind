import React, { useState } from "react";
import TopContainer from "./components/TopContainer/TopContainer";
import Buttons from "./components/Buttons/Buttons";
import DisplayTableContainer from "./components/TableContainer/TableContainer";
import SurfIcon from "./img/svg/surfIcon";
import { AppContainer } from "./App.style";
import locations from "./utils/locations";

import "./App.css";

function App() {
  const [currentLocationCoordinates, setCurrentLocationCoordinates] = useState({
    latitude: "",
    longitude: "",
  }); // sets current location
  const [currentPostCode, setCurrentPostCode] = useState(false);
  const [allSurfLocationsArray, setAllSurfLocationsArray] = useState(locations);
  const [userLevel, setUserLevel] = useState(false); // sets to novice, intermediate or expert
  const [tableRows, setTableRows] = useState([]);

  return (
    <AppContainer>
      <SurfIcon />
      {userLevel ? (
        <TopContainer
          currentLocationCoordinates={currentLocationCoordinates}
          setCurrentLocationCoordinates={setCurrentLocationCoordinates}
          setCurrentPostCode={setCurrentPostCode}
          currentPostCode={currentPostCode}
        />
      ) : (
        <Buttons
          setUserLevel={setUserLevel}
          setAllSurfLocationsArray={setAllSurfLocationsArray}
          allSurfLocationsArray={allSurfLocationsArray}
          currentPostCode={currentPostCode}
          setCurrentPostCode={setCurrentPostCode}
        />
      )}

      <DisplayTableContainer
        userLevel={userLevel}
        currentPostCode={currentPostCode}
        allSurfLocationsArray={allSurfLocationsArray}
        setAllSurfLocationsArray={setAllSurfLocationsArray}
        tableRows={tableRows}
        setTableRows={setTableRows}></DisplayTableContainer>
    </AppContainer>
  );
}

export default App;
