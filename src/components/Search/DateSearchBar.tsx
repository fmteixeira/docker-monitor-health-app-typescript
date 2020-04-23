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
  onDateChange: (event: any) => void;
  onHourChange: (event: any) => void;
}

export default function DateAndTimePickers(props: Props): JSX.Element {
  const { onChange } = props;

  const [selectedDate, setSelectedDate] = useState<any | null>(
    moment().format()
  );
  const [selectedHour, setSelectedHour] = useState<any | null>(
    moment().format()
  );

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    props.onDateChange(date.format());
  };

  const handleHourChange = (hour: any) => {
    setSelectedHour(hour);
    props.onHourChange(hour.format("LTS"));
  };

  return (
    <div className="date-picker-container">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
          <MuiPickersUtilsProvider utils={MomentUtils} locale="fr">
            <div className="date-picker">
              <KeyboardDatePicker
                label="Date picker"
                format={"YYYY-MM-DD"}
                value={selectedDate}
                onChange={handleDateChange}
                animateYearScrolling={false}
              />
            </div>
          </MuiPickersUtilsProvider>

          <div className="time-picker">
            <KeyboardTimePicker
              id="time-picker"
              label="Time picker"
              value={selectedHour}
              onChange={handleHourChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </div>

          <div className="status-container">
            <FormControl>
              <InputLabel htmlFor="status-native-simple">Status</InputLabel>
              <Select
                native
                onChange={onChange}
                inputProps={{
                  name: "status",
                  id: "status-native-simple",
                }}
                className="select-status"
              >
                <option value={"status"}>Choose status</option>
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
