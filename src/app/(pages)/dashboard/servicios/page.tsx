"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import Title from "@/components/Title";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import Form from "./Form";

import { deleteService } from "@/services/services/deleteService";
import useServices from "@/hooks/useServices";
import { TService } from "@/types";

export default function ServiciosPage() {
  const { services, reloadServices } = useServices();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<TService>();

  const handleModalClose = () => {
    setOpen(false);
    setService(undefined);
  };

  const handleEditIconClick = (service: TService) => {
    setOpen(true);
    setService(service);
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

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Title text="Servicios" mb={0} />
        <Button
          variant="contained"
          sx={{ backgroundColor: "var(--lightGreen)" }}
          onClick={() => setOpen(true)}
        >
          Agregar servicio
        </Button>
      </Box>
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
            edit: ({ id, ...row }) =>
              handleEditIconClick({ ...row, id_service: id }),
            delete: (row) => handleDeleteIconClick(row.id),
          }}
        />
      </Box>
      <Modal open={open} onClose={handleModalClose}>
        <Form initialValues={service} onSuccessForm={handleSuccessForm} />
      </Modal>
    </>
  );
}

type TTableData = {
  id: number;
  name: string;
  description: string;
};
