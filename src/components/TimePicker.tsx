import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

const hours = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`,
);
const specialOptions = ["Open 24 hours", "Closed"];
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type WorkingHours = {
  [key: string]: string[];
};

type TimePickerProps = {
  workingHours: WorkingHours;
  setWorkingHours: (hours: WorkingHours) => void;
};

const TimePicker: React.FC<TimePickerProps> = ({
  workingHours,
  setWorkingHours,
}) => {
  const defaultTimeRange = "9 AM–11 PM";

  const convertTo24HourFormat = (time: string) => {
    if (!time) return "00:00";
    if (specialOptions.includes(time)) return time;
    const [hourPart, period] = time.split(" ");
    const [hour] = hourPart.split(":");
    let formattedHour = period === "PM" && +hour !== 12 ? +hour + 12 : +hour;
    formattedHour = period === "AM" && +hour === 12 ? 0 : formattedHour;
    return `${formattedHour.toString().padStart(2, "0")}:00`;
  };

  const parseInitialHours = () => {
    return daysOfWeek.reduce((acc, day) => {
      const times = workingHours?.[day]?.[0] || defaultTimeRange;
      if (specialOptions.includes(times)) {
        acc[day] = { open: times, close: times };
      } else {
        const [open, close] = times.split("–");
        acc[day] = {
          open: convertTo24HourFormat(open),
          close: convertTo24HourFormat(close),
        };
      }
      return acc;
    }, {} as Record<string, { open: string; close: string }>);
  };

  const [localWorkingHours, setLocalWorkingHours] = useState(parseInitialHours);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    setLocalWorkingHours(parseInitialHours());
  }, [workingHours]);

  const handleChange = (day: string, type: "open" | "close", value: string) => {
    setLocalWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  };

  const formatWorkingHours = () => {
    return daysOfWeek.reduce((acc, day) => {
      const { open, close } = localWorkingHours[day];
      acc[day] = [
        specialOptions.includes(open)
          ? open
          : `${convertTo12HourFormat(open)}–${convertTo12HourFormat(close)}`,
      ];
      return acc;
    }, {} as WorkingHours);
  };

  const convertTo12HourFormat = (time: string) => {
    if (specialOptions.includes(time)) return time;
    const [hour] = time.split(":");
    const period = +hour < 12 ? "AM" : "PM";
    const formattedHour = +hour % 12 || 12;
    return `${formattedHour} ${period}`;
  };

  const handleSave = () => {
    setWorkingHours(formatWorkingHours());
    setOpenPopup(false);
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpenPopup(true)}>
        Установить время работы
      </Button>
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>Выберите время работы</DialogTitle>
        <DialogContent>
          {daysOfWeek.map((day) => (
            <Box key={day} display="flex" alignItems="center" gap={2} mb={2}>
              <Typography sx={{ minWidth: 100 }}>{day}</Typography>
              <FormControl size="small">
                <Select
                  value={localWorkingHours[day]?.open || "09:00"}
                  onChange={(e) => handleChange(day, "open", e.target.value)}>
                  {[...specialOptions, ...hours].map((hour) => (
                    <MenuItem key={hour} value={hour}>
                      {hour}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              -
              <FormControl size="small">
                <Select
                  value={
                    specialOptions.includes(localWorkingHours[day]?.open)
                      ? localWorkingHours[day]?.open
                      : localWorkingHours[day]?.close || "23:00"
                  }
                  onChange={(e) => handleChange(day, "close", e.target.value)}
                  disabled={specialOptions.includes(
                    localWorkingHours[day]?.open,
                  )}>
                  {[...specialOptions, ...hours].map((hour) => (
                    <MenuItem key={hour} value={hour}>
                      {hour}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)}>Отмена</Button>
          <Button onClick={handleSave} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimePicker;

//
