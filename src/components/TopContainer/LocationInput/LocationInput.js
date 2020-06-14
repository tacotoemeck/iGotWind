import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
// import SurfIcon from "../../../img/svg/surfIcon";
import { LocationInputWrapper } from "./LocationInput.style";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    maxHeight: "35px",
  },
  button: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    padding: "0.5rem",
    backgroundColor: "#5C6164",
  },
}));

export default function InputWithIcon(props) {
  const classes = useStyles();

  const handleChange = async (event) => {
    props.setAddressInput(event.target.value);
  };

  return (
    <LocationInputWrapper>
      <FormControl className={classes.form}>
        <>
          <InputLabel htmlFor="input-with-icon-adornment">
            Enter location
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            }
          />
        </>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={props.searchAddress}>
          Search
        </Button>
      </FormControl>
    </LocationInputWrapper>
  );
}
