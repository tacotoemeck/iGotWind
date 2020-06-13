import React from "react";
import TopContainer from "./components/TopContainer/TopContainer";
import { AppContainer } from "./App.style";

import "./App.css";

function App() {
  const [
    currentLocationCoordinates,
    setCurrentLocationCoordinates,
  ] = React.useState({ latitude: "", longitude: "" }); // sets current location

  const [userLevel, setUserLevel] = React.useState("novice"); // sets to novice, intermediate or expert

  return (
    <AppContainer>
      <TopContainer
        currentLocationCoordinates={currentLocationCoordinates}
        setCurrentLocationCoordinates={setCurrentLocationCoordinates}
      />
    </AppContainer>
  );
}

export default App;
