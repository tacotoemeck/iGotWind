import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(name, distance, conditions, history) {
  return {
    name,
    distance,
    conditions,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.distance}</TableCell>
        <TableCell align="right">{row.conditions}</TableCell>
        {/* <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                gotWinds?
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Wind Speed</TableCell>
                    <TableCell>Wind Direction</TableCell>
                    {/* <TableCell align="right">Show</TableCell>
                    <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     distance: PropTypes.number.isRequired,
//     conditions: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

let rows = [
  // createData("Frozen yoghurt", 159, 6.0),
  // createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  // createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  // createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  // createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

function DisplayTableContainer(props) {
  const [tableRows, setTableRows] = useState([]);
  useEffect(() => {
    let currentLat = props.currentPostCode.lat;
    let currentLon = props.currentPostCode.lon;

    if (props.currentPostCode) {
      let modifiedArray = [...props.allSurfLocationsArray];

      function spaceRequests(index) {
        // change below num to modifiedArray.length
        if (index < 5) {
          let copyTableRows = [...tableRows];
          console.log(copyTableRows);
          setTimeout(() => {
            index++;

            const asyncLoop = async () => {
              // setDelay(modifiedArray[i]);

              const fetchLocation = await fetch(
                `../../../.netlify/functions/getDistances/getDistances.js?COORDS={"CURRENT_LATITUDE":${currentLat}, "CURRENT_LONGITUDE":${currentLon}, "DESTINATION_LATITUDE":${modifiedArray[index].latitude}, "DESTINATION_LONGITUDE":${modifiedArray[index].longitude}}`,
              );

              await fetchLocation.json().then((data) => {
                modifiedArray[index].distance = (
                  Number(data.routes[0].distance) / 1000
                ).toFixed(2);

                copyTableRows.push(
                  createData(
                    modifiedArray[index].name,
                    modifiedArray[index].distance,
                    "n/a",
                  ),
                );

                props.setAllSurfLocationsArray(modifiedArray);
                console.log("modifiedarray is :", modifiedArray);
                setTableRows(copyTableRows);
              });
            };

            asyncLoop();

            spaceRequests(index);
          }, 500);
        }
      }
      spaceRequests(0);
    }
  }, [props.currentPostCode]);

  // useEffect(() => {
  //   // console.log(props.allSurfLocationsArray[67]);
  //   if (props.allSurfLocationsArray[67].distance) {
  //     let copyTableRows = [];
  //     props.allSurfLocationsArray.forEach((location) => {
  //       console.log(location.distance);
  //       copyTableRows.push(createData(location.name, location.distance, "n/a"));
  //     });

  //     setTableRows(copyTableRows);
  //   }
  // }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Location</TableCell>
            <TableCell align="right">Distance</TableCell>
            <TableCell align="right">Conditions</TableCell>
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.allSurfLocationsArray.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DisplayTableContainer;
