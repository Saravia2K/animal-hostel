"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useQueryClient } from "@tanstack/react-query";

import Title from "@/components/Title";

import useLoadingOverlay from "@/hooks/useLoadingOverlay";
import usePet from "@/hooks/usePet";
import PetForm from "@/forms/PetForm";

export default function EditarMascotaPage() {
  const { id } = useParams<{ id: string }>();
  const { setOpenState } = useLoadingOverlay();
  const { pet, petLoading } = usePet(+id);
  const router = useRouter();
  const qc = useQueryClient();

  useEffect(() => {
    setOpenState(petLoading);
  }, [petLoading]);

  return (
    <>
      <Title text="Editar mascota" />
      <PetForm
        initialValues={{
          id_pet: pet?.id_pet,
          id_owner: pet?.owner.id_owner,
          id_veterinarian: pet?.veterinarian.id_veterinarian,
          name: pet?.name,
          birthday: pet?.birthday,
          sex: pet?.sex,
          breed: pet?.breed,
          coat_color: pet?.coat_color,
          extra_data: pet?.extra_data,
        }}
        onSuccessForm={() => {
          router.push("/dashboard/mascotas");
          qc.invalidateQueries({ queryKey: ["pets", pet?.id_pet] });
        }}
      />
    </>
  );
}
