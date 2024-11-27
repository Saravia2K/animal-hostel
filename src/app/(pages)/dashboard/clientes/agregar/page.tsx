"use client";

import Title from "@/components/Title";
import OwnerForm from "@/forms/OwnerForm";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";

export default function AgregarClientePage() {
  const router = useRouter();
  const fromMascotas = useSearchParams().get("from_mascotas") == "1";

  const handleFormSuccess = () => {
    const redirectPage = fromMascotas ? "mascotas/agregar" : "clientes";
    router.push(`/dashboard/${redirectPage}`);
  };

  return (
    <>
      <Title text="Agregar cliente" />
      <OwnerForm independent onSuccessForm={handleFormSuccess} />
    </>
  );
}
