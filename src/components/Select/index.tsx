"use client";

import { forwardRef, type Ref } from "react";
import {
  Box,
  MenuItem,
  IconButton,
  SelectProps,
  FormControl,
  Grid2 as Grid,
  FormHelperText,
  Select as MUISelect,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import styles from "./Select.module.scss";

const Select = forwardRef(function Select(
  props: TProps,
  ref: Ref<HTMLSelectElement>
) {
  const { items, label, onAddBtnClick, error, helperText, ..._props } = props;

  return (
    <Grid container columnSpacing={3} className={styles["select-container"]}>
      <Grid size={12}>
        <Box
          fontWeight="bold"
          color="var(--orange)"
          fontSize={21}
          marginBottom={2}
        >
          {label}
        </Box>
      </Grid>
      {onAddBtnClick && (
        <Grid
          size={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton onClick={onAddBtnClick}>
            <AddCircleIcon sx={{ color: "var(--orange)" }} fontSize="large" />
          </IconButton>
        </Grid>
      )}
      <Grid size={onAddBtnClick ? 11 : 12}>
        <FormControl fullWidth error={error}>
          <MUISelect fullWidth ref={ref} {..._props}>
            {items?.map(({ value, label }, i) => (
              <MenuItem key={i} value={value}>
                {label}
              </MenuItem>
            ))}
          </MUISelect>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </Grid>
    </Grid>
  );
});

export default Select;

type TProps = SelectProps & {
  items?: { value: string | number; label: string | number }[];
  onAddBtnClick?: () => void;
  error?: boolean;
  helperText?: string;
};
