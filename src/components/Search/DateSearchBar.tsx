import React, { useState } from "react";
import "./DateSearchBar.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

//Material-UI
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    inputField: {
      color: 'secondary',
    },
    formControl: {
      marginTop: '1.1rem',
      minWidth: 120,
    },
  })
);

interface Props {
  onChange: (event: any) => void;
  returnVariable: (date: MaterialUiPickersDate, value?: string | null | undefined) => void;
}

export default function DateAndTimePickers(props: Props): JSX.Element {
  const { onChange, returnVariable } = props;
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2020-04-21T21:11:54'),
  );

  const handleDateChange = (date: any) => {
    setSelectedDate(date._d)
    console.log("selected date is: " + date._d)
  };

  return (
    <div className="datePicker">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="YYYY/MM/DD"
            value={selectedDate}
            onChange={returnVariable}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={returnVariable}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="status-native-simple" className={classes.inputField}>Status</InputLabel>
            <Select
              className={classes.inputField}
              native
              onChange={onChange}
              inputProps={{
                name: 'status',
                id: 'status-native-simple',
              }}
            >
              <option value={'all'}>All</option>
              <option value={'healthy'}>Healthy</option>
              <option value={'unhealthy'}>Unhealthy</option>
            </Select>
          </FormControl>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}
