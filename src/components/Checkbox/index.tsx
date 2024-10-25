"use client";

import {
  FormControlLabel,
  Checkbox as MUICheckbox,
  type CheckboxProps,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckedBox from "@mui/icons-material/CheckBox";
import { forwardRef, Ref } from "react";

const Checkbox = forwardRef(function Checkbox(
  props: TProps,
  ref: Ref<HTMLInputElement>
) {
  const { label, ...checkboxProps } = props;
  return (
    <FormControlLabel
      sx={{ color: "var(--orange)" }}
      slotProps={{
        typography: {
          fontWeight: "bold",
          fontSize: 18,
          letterSpacing: 1,
        },
      }}
      control={
        <MUICheckbox
          inputRef={ref}
          icon={<CheckBoxOutlineBlankIcon sx={{ color: "var(--orange)" }} />}
          checkedIcon={<CheckedBox sx={{ color: "var(--orange)" }} />}
          {...checkboxProps}
        />
      }
      label={label}
    />
  );
});

export default Checkbox;

type TProps = Omit<CheckboxProps, "icon" | "checkedIcon"> & { label: string };
