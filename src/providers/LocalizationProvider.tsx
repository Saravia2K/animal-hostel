"use client";

import { type PropsWithChildren } from "react";
import { LocalizationProvider as MUILocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function LocalizationProvider({ children }: PropsWithChildren) {
  return (
    <MUILocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </MUILocalizationProvider>
  );
}
