"use client";

import { useEffect } from "react";
import { useRouter } from "next-nprogress-bar";
import { useParams } from "next/navigation";

import Title from "@/components/Title";
import OwnerForm from "@/forms/OwnerForm";

import useLoadingOverlay from "@/hooks/useLoadingOverlay";
import useOwner from "@/hooks/useOwner";

export default function EditarClientePage() {
  const { id } = useParams<{ id: string }>();
  const { owner, ownerLoading, reloadOwner } = useOwner(+id);
  const { setOpenState } = useLoadingOverlay();
  const router = useRouter();

  const handleSuccessForm = async () => {
    await reloadOwner();
    router.push(`/dashboard/clientes/${id}`);
  };

  useEffect(() => {
    setOpenState(ownerLoading);
  }, [setOpenState, ownerLoading]);

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
