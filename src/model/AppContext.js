import React, { useState, createContext } from "react";

const AppContext = createContext();

function AppContextProvider(props) {
  const [
    currentLocationCoordinates,
    setCurrentLocationCoordinates,
  ] = useState(); // sets current location

  const [userLevel, setUserLevel] = useState("novice"); // sets to novice, intermediate or expert

  const providerValue = {
    currentLocationCoordinates,
    setCurrentLocationCoordinates,
    userLevel,
    setUserLevel,
  };

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
