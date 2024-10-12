"use client";

import {
  Box,
  MenuItem,
  IconButton,
  SelectProps,
  Grid2 as Grid,
  Select as MUISelect,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import styles from "./Select.module.scss";

export default function Select(props: TProps) {
  const { items, label, onAddBtnClick, ..._props } = props;

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
        <MUISelect fullWidth {..._props}>
          {items?.map(({ value, label }, i) => (
            <MenuItem key={i} value={value}>
              {label}
            </MenuItem>
          ))}
        </MUISelect>
      </Grid>
    </Grid>
  );
}

type TProps = SelectProps & {
  items?: { value: string | number; label: string | number }[];
  onAddBtnClick?: () => void;
};
