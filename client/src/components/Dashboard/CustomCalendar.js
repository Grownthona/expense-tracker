import React from "react";
import dayjs from "dayjs";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.primary.contrastText,
  },
}));

//higlight the dates in highlightedDays arra
const ServerDay = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.includes(day.format("YYYY-MM-DD"));

  return (
    <HighlightedDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
    />
  );
};

const CustomCalendar = ({highlightedDays}) => {
  /*const highlightedDays=[
    "2024-03-01",
    "2024-03-09",
    "2024-03-21",
    "2024-03-12",
  ];
*/

  const today = dayjs();

  return (
    
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            defaultValue={today}
            minDate={today}
            maxDate={today.add(1, "month")}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
          />
        </LocalizationProvider>
      </Box>
  );
};

export default CustomCalendar;