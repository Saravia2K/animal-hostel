"use client";

import React, { forwardRef, type Ref } from "react";
import { Box, TextField, type TextFieldProps } from "@mui/material";

import styles from "./Input.module.scss";

const Input = forwardRef(function Input(
  props: TProps,
  ref: Ref<HTMLInputElement>
) {
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
      <TextField fullWidth inputRef={ref} {..._props} />
    </div>
  );
});

export default Input;

type TProps = Omit<TextFieldProps, "className" | "classes">;
