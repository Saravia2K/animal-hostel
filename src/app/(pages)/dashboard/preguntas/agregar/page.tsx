"use client";

import BasicFormPage from "@/components/BasicFormPage";
import QuestionForm from "@/forms/QuestionForm";
import { useQueryClient } from "@tanstack/react-query";

export default function AgregarPreguntaPage() {
  const qc = useQueryClient();

  return (
    <BasicFormPage
      component={QuestionForm}
      normalRedirectPage="preguntas"
      title="Agregar pregunta"
      onSuccessForm={() =>
        qc.invalidateQueries({ queryKey: ["questions"], exact: true })
      }
    />
  );
}
