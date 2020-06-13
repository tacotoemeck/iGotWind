import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
// import SurfIcon from "../../../img/svg/surfIcon";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
  },
}));

export default function InputWithIcon(props) {
  const classes = useStyles();

  const handleChange = async (event) => {
    props.setAddressInput(event.target.value);
  };

  return (
    <div>
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
          variant="outlined"
          color="primary"
          onClick={props.searchAddress}>
          Set
        </Button>
      </FormControl>
    </div>
  );
}
