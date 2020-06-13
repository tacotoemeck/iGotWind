import React, { useEffect } from "react";
import InputWithIcon from "./LocationInput/LocationInput";
import {
  TopContainerWrapper,
  InputContainer,
  CurrentAddress,
} from "./TopContainer.style";
import SurfIcon from "../../img/svg/surfIcon";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
// import { ThemeConsumer } from "styled-components";

function TopContainer(props) {
  const getCurrentCoordinates = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) =>
        props.setCurrentLocationCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (err) => console.log(err),
    );
  };

  useEffect(() => {
    console.log(props.currentLocationCoordinates.latitude);

    const func = async () => {
      const fetchLocation = await fetch(
        `../../../.netlify/functions/fetchAddress/fetchAddress.js?COORDS={"LATITUDE": ${props.currentLocationCoordinates.latitude}, "LONGITUDE":${props.currentLocationCoordinates.longitude}}`,
      );

      const finalFetch = await fetchLocation.json().then((data) => {
        props.setCurrentPostCode(data);
        console.log("final fetch is :", props.currentPostCode);
      });
    };

    func();
  }, [props.currentLocationCoordinates]);

  const inputMode = (
    <>
      <InputContainer>
        <InputWithIcon />
        <Link
          component="button"
          variant="body2"
          onClick={getCurrentCoordinates}>
          use current
        </Link>
      </InputContainer>
      <Button
        variant="outlined"
        color="primary"
        onClick={getCurrentCoordinates}>
        Set
      </Button>
      ;
    </>
  );

  return (
    <TopContainerWrapper>
      <SurfIcon />
      {/* {inputMode} */}
      {!props.currentPostCode ? (
        inputMode
      ) : (
        <CurrentAddress>
          {" "}
          {props.currentPostCode.address.city},{" "}
          {props.currentPostCode.address.postcode}{" "}
        </CurrentAddress>
      )}
    </TopContainerWrapper>
  );
}

export default TopContainer;
