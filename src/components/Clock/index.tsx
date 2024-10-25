"use client";

import { Box } from "@mui/material";
import {
  type PickerValidDate,
  type MobileTimePickerProps,
  MobileTimePicker,
} from "@mui/x-date-pickers";

import styles from "./Clock.module.scss";
import dayjs from "dayjs";

export default function Clock(props: TProps) {
  const { label, error, helperText, ..._props } = props;
  const todayTime = new Date(new Date().setHours(0, 0, 0, 0));

  return (
    <div className={styles["clock-container"]}>
      <Box
        fontWeight="bold"
        color="var(--orange)"
        fontSize={21}
        marginBottom={2}
      >
        {label}
      </Box>
      <MobileTimePicker
        defaultValue={dayjs(todayTime)}
        slotProps={{
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
  MobileTimePickerProps<PickerValidDate>,
  "className" | "classes"
> & {
  error?: boolean;
  helperText?: string;
};
