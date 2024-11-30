"use client";

import { useRouter } from "next-nprogress-bar";
import { Box } from "@mui/material";

import Title from "@/components/Title";
import EntryForm from "@/forms/EntryForm";

import useEntries from "@/hooks/useEntries";
import useEntriesByDate from "@/hooks/useEntriesByDate";

export default function FichaDeIngresoPage() {
  const router = useRouter();
  const { reloadEntries } = useEntries();
  const { reloadEntries: reloadTodayEntries } = useEntriesByDate();

  const handleSuccessForm = async () => {
    reloadEntries();
    reloadTodayEntries();
    router.push("/dashboard/reportes");
  };

  return (
    <>
      <Title text="Ficha de ingreso" />
      <Box p={5} borderRadius={4} sx={{ backgroundColor: "#fff" }}>
        <EntryForm onSuccessForm={handleSuccessForm} />
      </Box>
    </>
  );
}
