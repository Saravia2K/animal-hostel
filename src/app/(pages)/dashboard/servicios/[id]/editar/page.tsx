"use client";

import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import BasicFormPage from "@/components/BasicFormPage";
import ServicesForm from "@/forms/ServicesForm";

import useService from "@/hooks/useService";

export default function EditarServicioPage() {
  const { id } = useParams<{ id: string }>();
  const { service, reloadService } = useService(+id);
  const qc = useQueryClient();

  const handleFormSuccess = async () => {
    if (!service) return;

    reloadService();

    qc.invalidateQueries({ queryKey: ["services"], exact: true });
    for (const entry of service?.entries)
      qc.invalidateQueries({ queryKey: ["entries", entry.id_entry] });
  };

  if (!service) return;
  return (
    <BasicFormPage
      title="Agregar servicio"
      normalRedirectPage="servicios"
      component={ServicesForm}
      initialValues={service}
      onSuccessForm={handleFormSuccess}
    />
  );
}
