"use client";

import { useState } from "react";
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
import VeterinarianForm from "@/forms/VeterinarianForm";

import useVeterinarians from "@/hooks/useVeterinarians";
import deleteVeterinarian from "@/services/veterinarians/deleteVeterinarian";

import styles from "./page.module.scss";

export default function ClientesPage() {
  const [openForm, setOpenForm] = useState(false);
  const { veterinarians, reloadVeterinarians } = useVeterinarians();
  const qc = useQueryClient();
  const router = useRouter();

  const handleCloseFormToShow = () => {
    setOpenForm(false);
  };

  const handleDeleteButton = (id_owner: number) => {
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar este encargados?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      preConfirm: async () => {
        try {
          const deleted = await deleteVeterinarian(id_owner);

          if (!deleted) throw Error("Error trying to delete a veterinarian");

          return true;
        } catch (error) {
          if (process.env.NODE_ENV == "development") console.error(error);
          Swal.showValidationMessage("Error al intentar eliminar un encargado");
        }
      },
    }).then(async (v) => {
      if (v.isConfirmed) {
        await reloadVeterinarians();
        toast("Cliente eliminado exitosamente", {
          type: "info",
        });
        qc.invalidateQueries({ queryKey: ["veterinarians", id_owner] });
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
        <Title text="Encargados" mb={0} />
        <Button
          variant="contained"
          sx={{ backgroundColor: "var(--lightGreen)" }}
          onClick={() => setOpenForm(true)}
        >
          Agregar encargado
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {veterinarians?.map((v, i) => (
                <TableRow key={i}>
                  <TableCell>{v.names}</TableCell>
                  <TableCell>{v.last_names}</TableCell>
                  <TableCell>{v.cellphone}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        router.push(
                          `/dashboard/encargados/${v.id_veterinarian}`
                        )
                      }
                    >
                      <VisibilityIcon sx={{ color: "var(--orange)" }} />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        router.push(
                          `/dashboard/encargados/${v.id_veterinarian}/editar`
                        )
                      }
                    >
                      <EditIcon sx={{ color: "var(--lightGreen)" }} />
                    </IconButton>

                    <IconButton
                      onClick={() => handleDeleteButton(v.id_veterinarian)}
                    >
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
        <VeterinarianForm onSuccessForm={handleCloseFormToShow} />
      </Modal>
    </Grid>
  );
}
