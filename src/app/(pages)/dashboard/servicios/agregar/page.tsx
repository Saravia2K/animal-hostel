"use client";

import { useQueryClient } from "@tanstack/react-query";

import BasicFormPage from "@/components/BasicFormPage";
import ServicesForm from "@/forms/ServicesForm";

export default function AgregarServicioPage() {
  const qc = useQueryClient();

  return (
    <BasicFormPage
      component={ServicesForm}
      title="Agregar servicio"
      normalRedirectPage="servicios"
      onSuccessForm={() =>
        qc.invalidateQueries({ queryKey: ["services"], exact: true })
      }
    />
  );
}
