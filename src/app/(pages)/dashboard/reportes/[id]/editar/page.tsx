"use client";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

import Title from "@/components/Title";
import EntryForm from "@/forms/EntryForm";
import useEntry from "@/hooks/useEntry";
import useEntries from "@/hooks/useEntries";
import useEntriesByDate from "@/hooks/useEntriesByDate";

export default function EditarReporte() {
  const { id } = useParams<{ id: string }>();
  const { entry, reloadEntry } = useEntry(+id);
  const { reloadEntries } = useEntries();
  const { reloadEntries: reloadTodayEntries } = useEntriesByDate();

  const router = useRouter();

  const handleSuccessForm = async () => {
    reloadEntries();
    reloadEntry();
    reloadTodayEntries();
    router.push("/dashboard/reportes");
  };

  if (!entry) return <></>;
  const { pet, services, questionnaires, annotations, ...initialValues } =
    entry;
  return (
    <>
      <Title text="Ficha de ingreso" />
      <Box p={5} borderRadius={4} sx={{ backgroundColor: "#fff" }}>
        <EntryForm
          initialValues={{
            ...initialValues,
            entry_time: initialValues.entry_date,
            exit_time: initialValues.exit_date,
            id_pet: pet.id_pet,
            services: services.map((s) => s.id_service),
            answers: questionnaires.map((q) => q.answer),
            observations: annotations,
          }}
          onSuccessForm={handleSuccessForm}
        />
      </Box>
    </>
  );
}
