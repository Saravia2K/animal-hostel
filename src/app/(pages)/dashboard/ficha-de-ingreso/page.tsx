"use client";

import { Box } from "@mui/material";

import Title from "@/components/Title";
import EntryForm from "@/forms/EntryForm";

export default function FichaDeIngresoPage() {
  return (
    <>
      <Title text="Ficha de ingreso" />
      <Box p={5} borderRadius={4} sx={{ backgroundColor: "#fff" }}>
        <EntryForm />
      </Box>
    </>
  );
}
