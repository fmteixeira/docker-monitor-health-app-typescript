import React, { useState } from "react";
import "./DateSearchBar.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

//Material-UI
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import TextField from '@material-ui/core/TextField';
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
    formContainer: {
      marginTop: '1rem',
    },
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
  returnVariable: (date: any) => void;
  handleDateChange: (date: any) => void;
}

export default function DateAndTimePickers(props: Props): JSX.Element {
  const { onChange, returnVariable } = props;
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2020-04-21T21:11:54'),
  );

  const handleDateChange = (date: any) => {
    setSelectedDate(date._d)
  };

  return (
    <div className="datePicker">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
        <form className={classes.formContainer} noValidate>
          <TextField
            id="datetime-local"
            label="Date Picker"
            type="datetime-local"
            defaultValue="2020-05-24T10:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={props.handleDateChange}
          />
        </form>
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
          <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={returnVariable}
          KeyboardButtonProps={{
            'aria-label': 'change date',
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
