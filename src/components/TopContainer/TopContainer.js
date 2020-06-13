import React, { useEffect } from "react";
import InputWithIcon from "./LocationInput/LocationInput";
import { TopContainerWrapper, InputContainer } from "./TopContainer.style";
import SurfIcon from "../../img/svg/surfIcon";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
// import func from '../../../.netlify'
// import func from '../../../functions/getCurrentAddress/getCurrentAddress.js'

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
        `../../../.netlify/functions/fetchAddress/fetchAddress.js?LATITUDE=${props.currentLocationCoordinates.latitude}?LONGITUDE=${props.currentLocationCoordinates.longitude}`,
      );
      //   const fetchLocation = await fetch(
      //     `../../../.netlify/functions/getCurrentAddress/getCurrentAddress.js`,
      //   );

      const finalFetch = await fetchLocation.json();
      console.log(finalFetch);
    };

    func();
  }, [props.currentLocationCoordinates]);

  return (
    <TopContainerWrapper>
      <SurfIcon />
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
    </TopContainerWrapper>
  );
}

export default TopContainer;
