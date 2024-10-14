"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import Title from "@/components/Title";

import useLoadingOverlay from "@/hooks/useLoadingOverlay";
import usePet from "@/hooks/usePet";
import usePets from "@/hooks/usePets";
import deletePet from "@/services/pets/deletePet";

import dogImage from "@/assets/images/pet_card_image.png";

export default function MascotaDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { setOpenState } = useLoadingOverlay();
  const { pet, petLoading } = usePet(+id);
  const { reloadPets } = usePets();
  const router = useRouter();

  useEffect(() => {
    setOpenState(petLoading);
  }, [petLoading, setOpenState]);

  const handleDeleteButton = () => {
    if (pet?.id_pet == undefined) return;

    Swal.fire({
      title: "¿Estás seguro que quieres eliminar esta mascota?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      preConfirm: async () => {
        try {
          const deleted = await deletePet(pet!.id_pet);

          if (!deleted) throw Error("Error trying to delete pet");

          return true;
        } catch (error) {
          if (process.env.NODE_ENV == "development") console.error(error);
          Swal.showValidationMessage("Error al intentar eliminar la mascota");
        }
      },
    }).then(async () => {
      await reloadPets();
      toast("Mascota eliminada exitosamente", {
        type: "info",
      });
      router.push("/dashboard/mascotas");
    });
  };

  if (!pet) return;
  return (
    <>
      <Grid container>
        <Grid
          size={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Title text={pet.name} mb={0} />
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "var(--orange)" }}
              onClick={() =>
                router.push(`/dashboard/mascotas/${pet.id_pet}/editar`)
              }
            >
              Editar mascota
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "var(--darkGreen)" }}
              onClick={handleDeleteButton}
            >
              Eliminar mascota
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        mt={8}
        py={4}
        px={7}
        display="flex"
        alignItems="center"
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <Grid size={4}>
          <Image
            src={dogImage}
            alt=""
            style={{ border: "2px solid grey", borderRadius: "100%" }}
          />
        </Grid>
        <Grid size={8}>
          <Grid container spacing={4} columns={12}>
            <Grid size={12}>
              <Title text="Datos de la mascota" mb={0} fontSize={25} />
            </Grid>

            <Grid size={4}>
              <Typography fontFamily="inherit" fontWeight="bold">
                Nombre:
              </Typography>
              <Typography fontFamily="inherit" fontSize={14}>
                {pet.name}
              </Typography>
            </Grid>

            <Grid size={4}>
              <Typography fontFamily="inherit" fontWeight="bold">
                Sexo:
              </Typography>
              <Typography fontFamily="inherit" fontSize={14}>
                {pet.sex == "M" ? "Masculino" : "Femenino"}
              </Typography>
            </Grid>

            <Grid size={4}>
              <Typography fontFamily="inherit" fontWeight="bold">
                Raza:
              </Typography>
              <Typography fontFamily="inherit" fontSize={14}>
                {pet.breed}
              </Typography>
            </Grid>

            <Grid size={4}>
              <Typography fontFamily="inherit" fontWeight="bold">
                Color:
              </Typography>
              <Typography fontFamily="inherit" fontSize={14}>
                {pet.coat_color}
              </Typography>
            </Grid>

            <Grid size={4}>
              <Typography fontFamily="inherit" fontWeight="bold">
                Fecha de nacimiento:
              </Typography>
              <Typography fontFamily="inherit" fontSize={14}>
                {new Date(pet.birthday).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={4} columns={12} mt={4}>
            <Grid size={12}>
              <Title text="Datos del dueño" mb={0} fontSize={25} />
            </Grid>
            <Grid size={4}>
              <Typography fontFamily="inherit" fontWeight="bold">
                Nombre:
              </Typography>
              <Typography fontFamily="inherit" fontSize={14}>
                {pet.owner.names} {pet.owner.last_names}
              </Typography>
            </Grid>

            <Grid size={4}>
              <Typography fontFamily="inherit" fontWeight="bold">
                Teléfono:
              </Typography>
              <Typography fontFamily="inherit" fontSize={14}>
                {pet.owner.cellphone}
              </Typography>
            </Grid>

            <Grid size={4}>
              <Typography fontFamily="inherit" fontWeight="bold">
                Dirección:
              </Typography>
              <Typography fontFamily="inherit" fontSize={14}>
                {pet.owner.home}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
