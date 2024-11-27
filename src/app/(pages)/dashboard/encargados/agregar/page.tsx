import BasicFormPage from "@/components/BasicFormPage";
import VeterinarianForm from "@/forms/VeterinarianForm";

export default function AgregarEncargadoPage() {
  return (
    <BasicFormPage
      component={VeterinarianForm}
      title="Agregar encargado"
      normalRedirectPage="encargados"
    />
  );
}
