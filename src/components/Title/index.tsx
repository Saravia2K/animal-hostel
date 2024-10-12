"use client";

import { Box } from "@mui/material";

export default function Title({ text }: { text: string }) {
  return (
    <Box component="h1" color="#589237" fontSize="40px" mb={6}>
      {text}
    </Box>
  );
}
