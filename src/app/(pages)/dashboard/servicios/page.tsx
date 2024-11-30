"use client";

import { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { Box } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import Table from "@/components/Table";
import Modal from "@/components/Modal";
import TitleWithButton from "@/components/TitleWithButton";
import ServicesForm from "@/forms/ServicesForm";

import useServices from "@/hooks/useServices";
import useIsResponsive from "@/hooks/useIsResponsive";
import { deleteService } from "@/services/services/deleteService";

export default function ServiciosPage() {
  const { services, reloadServices } = useServices();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<TTableData>();
  const router = useRouter();
  const isResponsive = useIsResponsive({ excludeTablets: true });

  const handleModalClose = () => {
    setOpen(false);
    setService(undefined);
  };

  const handleEditIconClick = (service: TTableData) => {
    if (!isResponsive) {
      setOpen(true);
      setService(service);
      return;
    }

    router.push(`/dashboard/servicios/${service.id}/editar`);
  };

  const handleSuccessForm = () => {
    reloadServices();
    handleModalClose();
    qc.invalidateQueries({ queryKey: ["pets"] });
    qc.invalidateQueries({ queryKey: ["entries"] });
  };

  const handleDeleteIconClick = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar este servicio?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      preConfirm: async () => {
        try {
          const deleted = await deleteService(id);

          if (!deleted) throw Error("Error trying to delete service");

          return true;
        } catch (error) {
          if (process.env.NODE_ENV == "development") console.error(error);
          Swal.showValidationMessage("Error al intentar eliminar el servicio");
        }
      },
    }).then(async (v) => {
      if (v.isConfirmed) {
        reloadServices();
        toast("Servicio eliminado exitosamente", {
          type: "info",
        });
        qc.invalidateQueries({ queryKey: ["pets"] });
        qc.invalidateQueries({ queryKey: ["entries"] });
      }
    });
  };

  const handleAddServiceClick = () => {
    if (!isResponsive) {
      setOpen(true);
      return;
    }

    router.push("/dashboard/servicios/agregar");
  };

  return (
    <>
      <TitleWithButton
        title="Servicios"
        buttonText="Agregar servicio"
        onClick={handleAddServiceClick}
      />
      <Box mt={7} p={3} borderRadius={2} bgcolor="#fff">
        <Table<TTableData>
          headers={[
            { id: "id", label: "ID" },
            { id: "name", label: "Nombre del servicio" },
            { id: "description", label: "Descripción del servicio" },
          ]}
          data={
            services?.map((s) => ({
              id: s.id_service,
              name: s.name,
              description: s.description,
            })) ?? []
          }
          actions={{
            edit: (row) => handleEditIconClick(row),
            delete: (row) => handleDeleteIconClick(row.id),
          }}
        />
      </Box>
      <Modal open={open} onClose={handleModalClose}>
        <ServicesForm
          initialValues={service}
          onSuccessForm={handleSuccessForm}
        />
      </Modal>
    </>
  );
}

type TTableData = {
  id: number;
  name: string;
  description: string;
};
