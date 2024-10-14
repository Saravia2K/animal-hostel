"use client";

import { Typography } from "@mui/material";

export default function CardInformation({ header, text }: TProps) {
  return (
    <>
      <Typography fontFamily="inherit" fontWeight="bold">
        {header}
      </Typography>
      <Typography fontFamily="inherit" fontSize={14}>
        {text}
      </Typography>
    </>
  );
}

type TProps = {
  header: string;
  text: string;
};
