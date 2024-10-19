"use client";

import { useRouter } from "next-nprogress-bar";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import Title from "@/components/Title";
import OwnerForm from "@/forms/OwnerForm";

import useOwner from "@/hooks/useOwner";

export default function EditarClientePage() {
  const { id } = useParams<{ id: string }>();
  const { owner, ownerLoading, reloadOwner } = useOwner(+id);
  const router = useRouter();
  const qc = useQueryClient();

  const handleSuccessForm = async () => {
    await reloadOwner();

    for (const pet of owner!.pets)
      qc.invalidateQueries({ queryKey: ["pets", pet.id_pet] });

    router.push(`/dashboard/clientes/${id}`);
  };

  if (!owner || ownerLoading) return <></>;
  return (
    <>
      <Title text="Editar cliente" />
      <OwnerForm
        independent
        initialValues={owner}
        onSuccessForm={handleSuccessForm}
      />
    </>
  );
}
