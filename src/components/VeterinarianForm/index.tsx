"use client";

import { Button, Grid2 as Grid } from "@mui/material";
import Title from "../Title";
import Input from "../Input";

export default function VeterinarianForm() {
  return (
    <Grid container component="form" spacing={3} sx={{ width: "50dvw" }}>
      <Grid size={12}>
        <Title text="Agregar veterinario" />
      </Grid>
      <Grid size={6}>
        <Input label="Nombres" placeholder="Escriba los nombres aquí" />
      </Grid>
      <Grid size={6}>
        <Input label="Apellidos" placeholder="Escriba los apellidos aquí" />
      </Grid>
      <Grid size={6}>
        <Input
          label="Nombre de clínica"
          placeholder="Escriba el nombre de la clínica aquí"
        />
      </Grid>
      <Grid size={6}>
        <Input
          label="Teléfono"
          placeholder="Escriba el teléfono aquí"
          type="tel"
          autoComplete="off"
        />
      </Grid>
      <Grid size={12}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "var(--lightGreen)",
            width: "100%",
            padding: "15px 0",
          }}
        >
          Agregar
        </Button>
      </Grid>
    </Grid>
  );
}
