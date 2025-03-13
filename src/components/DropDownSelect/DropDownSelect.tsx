import { Box, MenuItem, TextField, Typography } from "@mui/material";

interface DropDownSelectProps<T extends { _id: string; name: string }> {
  data: T[] | undefined;
  selectedValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const DropDownSelect = <T extends { _id: string; name: string }>({
  data,
  selectedValue,
  handleChange,
  label,
}: DropDownSelectProps<T>) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "100px",
        flex: 1,
      }}>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 3,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
        {label}
      </Typography>
      <TextField
        select
        label={label}
        fullWidth
        value={selectedValue}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ marginBottom: 3 }}>
        {data?.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default DropDownSelect;
