"use client";

import { Box, TextField, type TextFieldProps } from "@mui/material";

import styles from "./Input.module.scss";

export default function Input(props: TProps) {
  const { label, ..._props } = props;

  return (
    <div className={styles["input-container"]}>
      <Box
        fontWeight="bold"
        color="var(--orange)"
        fontSize={21}
        marginBottom={2}
      >
        {label}
      </Box>
      <TextField fullWidth {..._props} />
    </div>
  );
}

type TProps = Omit<TextFieldProps, "className" | "classes">;
