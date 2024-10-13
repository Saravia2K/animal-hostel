"use client";

import { Box } from "@mui/material";
import {
  DatePicker,
  type PickerValidDate,
  type DatePickerProps,
} from "@mui/x-date-pickers";

import styles from "./Calendar.module.scss";

export default function Calendar(props: TProps) {
  const { label, error, helperText, ..._props } = props;

  return (
    <div className={styles["calendar-container"]}>
      <Box
        fontWeight="bold"
        color="var(--orange)"
        fontSize={21}
        marginBottom={2}
      >
        {label}
      </Box>
      <DatePicker
        slotProps={{
          inputAdornment: {
            position: "start",
          },
          textField: {
            fullWidth: true,
            error,
            helperText,
          },
        }}
        {..._props}
      />
    </div>
  );
}

type TProps = Omit<
  DatePickerProps<PickerValidDate>,
  "className" | "classes"
> & {
  error?: boolean;
  helperText?: string;
};
