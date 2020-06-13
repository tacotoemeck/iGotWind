import React, { useEffect, useState } from "react";
import InputWithIcon from "./LocationInput/LocationInput";
import {
  TopContainerWrapper,
  InputContainer,
  CurrentAddress,
} from "./TopContainer.style";
import SurfIcon from "../../img/svg/surfIcon";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
// import { ThemeConsumer } from "styled-components";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    flexGrow: 1,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function TopContainer(props) {
  const classes = useStyles();

  const [addressOptions, setAddressOptions] = useState([]);
  const [addressInput, setAddressInput] = useState("");
  const [addresSelectionMode, setAddressSelectionMode] = useState("text");

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

  const searchAddress = async () => {
    const func = async () => {
      const fetchLocation = await fetch(
        `../../../.netlify/functions/searchAddress/searchAddress.js?SEARCH_PARAMS=${addressInput}`,
      );

      await fetchLocation.json().then((data) => {
        setAddressOptions(data);
        setAddressSelectionMode("dropdown");
      });
    };

    func();
  };

  useEffect(() => {
    const func = async () => {
      const fetchLocation = await fetch(
        `../../../.netlify/functions/fetchAddress/fetchAddress.js?COORDS={"LATITUDE": ${props.currentLocationCoordinates.latitude}, "LONGITUDE":${props.currentLocationCoordinates.longitude}}`,
      );

      await fetchLocation.json().then((data) => {
        props.setCurrentPostCode(data);
      });
    };

    func();
  }, [props.currentLocationCoordinates]);

  const handleChange = async (event) => {
    const fetchLocation = await fetch(
      `../../../.netlify/functions/fetchAddress/fetchAddress.js?COORDS={"LATITUDE": ${event.target.value.LATITUDE}, "LONGITUDE":${event.target.value.LONGITUDE}}`,
    );

    await fetchLocation.json().then((data) => {
      console.log(data);
      props.setCurrentPostCode(data);
    });
  };

  const pickAddressInput = (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Choose address</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value="adress list"
        displayEmpty
        onChange={handleChange}>
        <MenuItem value="" disabled>
          Choose the address
        </MenuItem>
        {addressOptions.map((address) => (
          <MenuItem
            key={address.place_id}
            value={{ LATITUDE: address.lat, LONGITUDE: address.lon }}>
            {address.display_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const inputMode =
    addresSelectionMode === "text" ? (
      <>
        <InputContainer>
          <InputWithIcon
            searchAddress={searchAddress}
            setAddressInput={setAddressInput}
          />
          <Link
            component="button"
            variant="body2"
            onClick={getCurrentCoordinates}>
            use current
          </Link>
        </InputContainer>
      </>
    ) : (
      pickAddressInput
    );

  return (
    <TopContainerWrapper>
      <SurfIcon />
      {!props.currentPostCode ? (
        inputMode
      ) : (
        <CurrentAddress>
          {props.currentPostCode.address.city},
          {props.currentPostCode.address.postcode}
        </CurrentAddress>
      )}
    </TopContainerWrapper>
  );
}

export default TopContainer;
