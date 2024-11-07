"use client";

import { useRouter } from "next-nprogress-bar";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import Title from "@/components/Title";

import useVeterinarian from "@/hooks/useVeterinarian";
import VeterinarianForm from "@/forms/VeterinarianForm";

export default function EditarClientePage() {
  const { id } = useParams<{ id: string }>();
  const { veterinarian, veterinarianLoading, reloadVeterinarian } =
    useVeterinarian(+id);
  const router = useRouter();
  const qc = useQueryClient();

  const handleSuccessForm = async () => {
    await reloadVeterinarian();

    for (const pet of veterinarian!.pets)
      qc.invalidateQueries({ queryKey: ["pets", pet.id_pet] });

    router.push(`/dashboard/encargados/${id}`);
  };

  if (!veterinarian || veterinarianLoading) return <></>;
  return (
    <>
      <Title text="Editar encargado" />
      <VeterinarianForm
        independent
        initialValues={veterinarian}
        onSuccessForm={handleSuccessForm}
      />
    </>
  );
}
