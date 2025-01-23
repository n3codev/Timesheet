import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSearchParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";

export default function BasicDatePicker({ selectedDate, onChange }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlDate = searchParams.get("date");

  const parsedDate =
    urlDate && dayjs(urlDate, "DD-MM-YYYY").isValid()
      ? dayjs(urlDate, "DD-MM-YYYY")
      : dayjs(selectedDate, "YYYY-MM-DD").isValid()
      ? dayjs(selectedDate, "YYYY-MM-DD")
      : dayjs();

  const handleDateChange = (newValue) => {
    if (!newValue || !dayjs(newValue).isValid()) {
      console.error("Invalid date selected:", newValue);
      return;
    }

    const formattedDateForURL = newValue.format("DD-MM-YYYY");
    const formattedDateForDB = newValue.format("YYYY-MM-DD");

    navigate(`/?date=${formattedDateForURL}`);
    onChange(formattedDateForDB);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]} className="custom-date-picker">
        <DatePicker
          label="Pick a date"
          value={parsedDate}
          onChange={handleDateChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              border: "none",
              backgroundColor: "transparent",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-input": {
              color: "white",
              fontSize: "30px",
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
              fontSize: "30px",
              marginLeft: "-20rem",
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

BasicDatePicker.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
