import React, { useEffect, useState } from "react";
import InputWithIcon from "./LocationInput/LocationInput";
import {
  TopContainerWrapper,
  InputContainer,
  CurrentAddress,
  Wrapper,
  TopContainerTitle,
} from "./TopContainer.style";
import Link from "@material-ui/core/Link";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    flexGrow: 1,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  link: {
    fontSize: "11px",
    marginTop: "-5px",
    textAlign: "left",
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
      ).catch(console.error);

      await fetchLocation
        .json()
        .then((data) => {
          setAddressOptions(data);
          setAddressSelectionMode("dropdown");
        })
        .catch(console.error);
    };
    func();
  };

  const getCurrentAddress = async () => {
    const func = async () => {
      const fetchLocation = await fetch(
        `../../../.netlify/functions/fetchAddress/fetchAddress.js?COORDS={"LATITUDE": ${props.currentLocationCoordinates.latitude}, "LONGITUDE":${props.currentLocationCoordinates.longitude}}`,
      ).catch(console.error);
      await fetchLocation
        .json()
        .then((data) => {
          props.setCurrentPostCode(data);
        })
        .catch(console.error);
    };

    func();
  };

  useEffect(() => {
    // if 'useCurrentLocation' has been used , run get the current address from the locationIQ api
    if (props.currentLocationCoordinates.latitude > 0) {
      getCurrentAddress();
    }
  }, [props.currentLocationCoordinates]);

  const handleChange = async (event) => {
    const fetchLocation = await fetch(
      `../../../.netlify/functions/fetchAddress/fetchAddress.js?COORDS={"LATITUDE": ${event.target.value.LATITUDE}, "LONGITUDE":${event.target.value.LONGITUDE}}`,
    ).catch(console.error);
    await fetchLocation
      .json()
      .then((data) => {
        props.setCurrentPostCode(data);
      })
      .catch(console.error);
  };

  //   different output depending on the application state :

  //
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
            className={classes.link}
            onClick={getCurrentCoordinates}>
            use your current location
          </Link>
        </InputContainer>
      </>
    ) : (
      pickAddressInput
    );

  return (
    <>
      <Wrapper>
        <TopContainerTitle>choose current location</TopContainerTitle>
        <TopContainerWrapper>
          {!props.currentPostCode ? (
            inputMode
          ) : (
            <CurrentAddress>
              {props.currentPostCode.address.city},
              {props.currentPostCode.address.postcode}
            </CurrentAddress>
          )}
        </TopContainerWrapper>
      </Wrapper>
    </>
  );
}

export default TopContainer;
