"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import {
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Grid2 as Grid,
  TableContainer,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

import Title from "@/components/Title";
import Modal from "@/components/Modal";
import OwnerForm from "@/forms/OwnerForm";

import useOwners from "@/hooks/useOwners";
import useLoadingOverlay from "@/hooks/useLoadingOverlay";
import deleteOwner from "@/services/owners/deleteOwner";

import styles from "./page.module.scss";

export default function ClientesPage() {
  const [openForm, setOpenForm] = useState(false);
  const { setOpenState } = useLoadingOverlay();
  const { owners, ownersLoading, reloadOwners } = useOwners();
  const qc = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    setOpenState(ownersLoading);
  }, [setOpenState, ownersLoading]);

  const handleCloseFormToShow = () => {
    setOpenForm(false);
  };

  const handleDeleteButton = (id_owner: number) => {
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar este cliente?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      preConfirm: async () => {
        try {
          const deleted = await deleteOwner(id_owner);

          if (!deleted) throw Error("Error trying to delete owner");

          return true;
        } catch (error) {
          if (process.env.NODE_ENV == "development") console.error(error);
          Swal.showValidationMessage("Error al intentar eliminar el cliente");
        }
      },
    }).then(async (v) => {
      if (v.isConfirmed) {
        await reloadOwners();
        toast("Cliente eliminado exitosamente", {
          type: "info",
        });
        qc.invalidateQueries({ queryKey: ["owners", id_owner] });
        qc.invalidateQueries({ queryKey: ["pets"], exact: true });
        setOpenForm(false);
      }
    });
  };

  return (
    <Grid container className={styles["clientes-page"]} spacing={5}>
      <Grid
        size={12}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Title text="Clientes" mb={0} />
        <Button
          variant="contained"
          sx={{ backgroundColor: "var(--lightGreen)" }}
          onClick={() => setOpenForm(true)}
        >
          Agregar cliente
        </Button>
      </Grid>
      <Grid size={12} borderRadius={2} p={3} sx={{ backgroundColor: "#fff" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre(s)</TableCell>
                <TableCell>Apellido(s)</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {owners?.map((o, i) => (
                <TableRow key={i}>
                  <TableCell>{o.names}</TableCell>
                  <TableCell>{o.last_names}</TableCell>
                  <TableCell>{o.cellphone}</TableCell>
                  <TableCell>{o.email}</TableCell>
                  <TableCell>{o.home}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        router.push(`/dashboard/clientes/${o.id_owner}`)
                      }
                    >
                      <VisibilityIcon sx={{ color: "var(--orange)" }} />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        router.push(`/dashboard/clientes/${o.id_owner}/editar`)
                      }
                    >
                      <EditIcon sx={{ color: "var(--lightGreen)" }} />
                    </IconButton>

                    <IconButton onClick={() => handleDeleteButton(o.id_owner)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Modal open={openForm} onClose={handleCloseFormToShow}>
        <OwnerForm onSuccessForm={handleCloseFormToShow} />
      </Modal>
    </Grid>
  );
}
