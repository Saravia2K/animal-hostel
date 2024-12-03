"use client";

import EntryDetails from "@/components/EntryDetails";
import Title from "@/components/Title";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";

export default function ReportePage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Title text="Detalle de ingreso" mb={2} />
      <Box bgcolor="#fff" borderRadius={2} p={2}>
        <EntryDetails id={+id} />
      </Box>
    </>
  );
}
