"use client";

import { type PropsWithChildren } from "react";
import { LocalizationProvider as MUILocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import { esES } from "@mui/x-date-pickers/locales";

export default function LocalizationProvider({ children }: PropsWithChildren) {
  return (
    <MUILocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="es"
      localeText={
        esES.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      {children}
    </MUILocalizationProvider>
  );
}
