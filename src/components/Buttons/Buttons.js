import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { ButtonsDiv, ButtonsTitleText } from "./Buttons.style";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    background: "#DEEAF0",
  },
});

export default function Buttons(props) {
  const classes = useStyles();

  const setNovice = (event) => {
    console.log(event.target);
    props.setUserLevel("Novice");
  };

  const setIntermediate = (event) => {
    console.log(event.target);
    props.setUserLevel("Intermediate");
  };

  const setExpert = (event) => {
    console.log(event.target);
    props.setUserLevel("Expert");
  };

  return (
    <ButtonsDiv>
      <ButtonsTitleText>choose skill level</ButtonsTitleText>
      <ButtonGroup
        className={classes.buttonGroup}
        fullWidth
        variant="contained"
        aria-label="contained primary button group">
        <Button className={classes.button} onClick={setNovice}>
          Novice
        </Button>
        <Button className={classes.button} onClick={setIntermediate}>
          Intermediate
        </Button>
        <Button className={classes.button} onClick={setExpert}>
          Expert
        </Button>
      </ButtonGroup>
    </ButtonsDiv>
  );
}
