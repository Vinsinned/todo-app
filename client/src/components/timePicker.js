import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import '../styles/style.css';

export default function ResponsiveTimePicker(props) {
  const { todo, updateTodo, value, updateValue } = props;

  //When the time picker's value is changed, set the state and todo with the new value
  function timePickerChange(value) {
    updateValue(value);
    updateTodo({ time: value });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        value={value}
        onChange={(value) => timePickerChange(value)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
