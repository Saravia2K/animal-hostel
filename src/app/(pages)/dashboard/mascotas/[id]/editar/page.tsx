"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useQueryClient } from "@tanstack/react-query";

import Title from "@/components/Title";

import usePet from "@/hooks/usePet";
import PetForm from "@/forms/PetForm";

export default function EditarMascotaPage() {
  const { id } = useParams<{ id: string }>();
  const { pet } = usePet(+id);
  const router = useRouter();
  const qc = useQueryClient();

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
        onSuccessForm={(newPet) => {
          router.push(`/dashboard/mascotas/${id}`);
          qc.invalidateQueries({ queryKey: ["pets", pet?.id_pet] });
          qc.invalidateQueries({ queryKey: ["owners", pet?.owner.id_owner] });
          qc.invalidateQueries({ queryKey: ["owners", newPet.id_owner] });
          qc.invalidateQueries({
            queryKey: ["veterinarians", pet?.veterinarian.id_veterinarian],
          });
          qc.invalidateQueries({
            queryKey: ["veterinarians", newPet.id_veterinarian],
          });
        }}
      />
    </>
  );
}
