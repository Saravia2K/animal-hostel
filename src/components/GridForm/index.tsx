"use client";

import { type PropsWithChildren } from "react";
import { Grid2 as Grid } from "@mui/material";

import useIsResponsive from "@/hooks/useIsResponsive";

export default function GridForm({ children, independent, onSubmit }: TProps) {
  const isResponsive = useIsResponsive();

  const independentPadding = isResponsive ? 5 : 7;
  return (
    <Grid
      container
      component="form"
      spacing={3}
      borderRadius={independent ? 3 : 0}
      p={independent ? independentPadding : 0}
      sx={{
        width: independent || isResponsive ? "100%" : "50dvw",
        backgroundColor: "#fff",
      }}
      onSubmit={onSubmit}
    >
      {children}
    </Grid>
  );
}

type TProps = PropsWithChildren<{
  independent?: boolean;
  onSubmit?: () => void;
}>;
