import React from "react";
import InputWithIcon from "./components/LocationInput/LocationInput";
import SurfIcon from "./img/svg/surfIcon";
import { TopContainer, AppContainer, InputContainer } from "./App.style";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import "./App.css";

function App() {
  const [
    currentLocationCoordinates,
    setCurrentLocationCoordinates,
  ] = React.useState(); // sets current location
  const [userLevel, setUserLevel] = React.useState("novice"); // sets to novice, intermediate or expert

  const getCurrentCoordinates = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) =>
        setCurrentLocationCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (err) => console.log(err),
    );
    console.log(currentLocationCoordinates);
  };

  return (
    <AppContainer>
      <TopContainer>
        <SurfIcon />
        <InputContainer>
          <InputWithIcon />
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}>
            use current
          </Link>
        </InputContainer>

        <Button
          variant="outlined"
          color="primary"
          onClick={getCurrentCoordinates}>
          Set
        </Button>
      </TopContainer>
    </AppContainer>
  );
}

export default App;
