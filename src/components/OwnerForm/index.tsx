"use client";

import { Button, Grid2 as Grid } from "@mui/material";
import Input from "../Input";

export default function OwnerForm() {
  return (
    <Grid container component="form" spacing={3} sx={{ width: "50dvw" }}>
      <Grid size={6}>
        <Input label="Nombres" placeholder="Escriba los nombres aquí" />
      </Grid>
      <Grid size={6}>
        <Input label="Apellidos" placeholder="Escriba los apellidos aquí" />
      </Grid>
      <Grid size={6}>
        <Input label="Email" placeholder="Escriba el email aquí" type="email" />
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
        <Input label="Dirección" placeholder="Escriba la dirección aquí" />
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
