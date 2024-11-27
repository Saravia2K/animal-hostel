import BasicFormPage from "@/components/BasicFormPage";
import OwnerForm from "@/forms/OwnerForm";

export default function AgregarClientePage() {
  return (
    <BasicFormPage
      title="Agregar cliente"
      normalRedirectPage="clientes"
      component={OwnerForm}
    />
  );
}
