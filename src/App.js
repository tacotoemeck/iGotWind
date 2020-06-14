import React, { useState } from "react";
import TopContainer from "./components/TopContainer/TopContainer";
import Buttons from "./components/Buttons/Buttons";
import DisplayTableContainer from "./components/TableContainer/TableContainer";

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
  const [userLevel, setUserLevel] = useState("novice"); // sets to novice, intermediate or expert
  const [tableRows, setTableRows] = useState([]);

  return (
    <AppContainer>
      <TopContainer
        currentLocationCoordinates={currentLocationCoordinates}
        setCurrentLocationCoordinates={setCurrentLocationCoordinates}
        setCurrentPostCode={setCurrentPostCode}
        currentPostCode={currentPostCode}
      />
      <Buttons setUserLevel={setUserLevel} />
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
