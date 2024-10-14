"use client";

import { useRouter } from "next-nprogress-bar";

import PetForm from "@/forms/PetForm";
import Title from "@/components/Title";

export default function AgregarMascotaPage() {
  const router = useRouter();

  return (
    <>
      <Title text="Agregar mascota" />
      <PetForm onSuccessForm={() => router.push("/dashboard/mascotas")} />
    </>
  );
}
