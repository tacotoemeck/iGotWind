import React, { useState } from "react";
import TopContainer from "./components/TopContainer/TopContainer";
import { AppContainer } from "./App.style";

import "./App.css";

function App() {
  const [currentLocationCoordinates, setCurrentLocationCoordinates] = useState({
    latitude: "",
    longitude: "",
  }); // sets current location
  const [currentPostCode, setCurrentPostCode] = useState(false);
  const [userLevel, setUserLevel] = useState("novice"); // sets to novice, intermediate or expert

  return (
    <AppContainer>
      <TopContainer
        currentLocationCoordinates={currentLocationCoordinates}
        setCurrentLocationCoordinates={setCurrentLocationCoordinates}
        setCurrentPostCode={setCurrentPostCode}
        currentPostCode={currentPostCode}
      />
    </AppContainer>
  );
}

export default App;
