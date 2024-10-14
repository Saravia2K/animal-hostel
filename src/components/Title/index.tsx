"use client";

import { Box, type BoxProps } from "@mui/material";

export default function Title(props: TProps) {
  const { text, ..._props } = props;
  return (
    <Box component="h1" color="#589237" fontSize="40px" mb={6} {..._props}>
      {text}
    </Box>
  );
}

type TProps = Omit<BoxProps, "children"> & { text: string };
