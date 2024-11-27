"use client";

import { useMediaQuery, useTheme } from "@mui/material";

export default function useIsResponsive(props?: Partial<TProps>) {
  const MUITheme = useTheme();
  const isResponsive = useMediaQuery(
    MUITheme.breakpoints.down(props?.excludeTablets ? "sm" : "md")
  );
  return isResponsive;
}

type TProps = {
  excludeTablets: boolean;
};
