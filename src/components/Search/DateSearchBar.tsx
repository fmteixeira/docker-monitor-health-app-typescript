import React, { useState } from "react";
import "./DateSearchBar.css";

//Material-UI
import "date-fns";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface Props {
  onChange: (event: any) => void;
  onHandleDateChange: (event: any) => void;
}

export default function DateAndTimePickers(props: Props): JSX.Element {
  const { onChange } = props;

  const [selectedDate, setSelectedDate] = React.useState<any | null>(
    moment().format()
  );
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    props.onHandleDateChange(date.format());
  };

  return (
    <div className="datePicker">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
          <MuiPickersUtilsProvider utils={MomentUtils} locale="fr">
            <div className="date">
              <KeyboardDatePicker
                format={"YYYY-MM-DD"}
                value={selectedDate}
                onChange={handleDateChange}
                autoOk={true}
                animateYearScrolling={false}
              />
            </div>
          </MuiPickersUtilsProvider>

          <div className="formControl">
            <FormControl>
              <InputLabel htmlFor="status-native-simple">Status</InputLabel>
              <Select
                native
                onChange={onChange}
                inputProps={{
                  name: "status",
                  id: "status-native-simple",
                }}
                className="formControl"
              >
                <option value={"all"}>All</option>
                <option value={"healthy"}>Healthy</option>
                <option value={"unhealthy"}>Unhealthy</option>
              </Select>
            </FormControl>
          </div>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}
