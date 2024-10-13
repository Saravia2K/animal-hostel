"use client";

import { useEffect, useState } from "react";
import {
  Radio,
  Button,
  RadioGroup,
  FormControl,
  Grid2 as Grid,
  FormControlLabel,
} from "@mui/material";

import Input from "@/components/Input";
import Calendar from "@/components/Calendar";
import Select from "@/components/Select";
import Modal from "@/components/Modal";
import OwnerForm from "../OwnerForm";
import VeterinarianForm from "../VeterinarianForm";

import useOwners from "@/hooks/useOwners";
import useVeterinarians from "@/hooks/useVeterinarians";
import useLoadingOverlay from "@/hooks/useLoadingOverlay";

import styles from "./PetForm.module.scss";

export default function PetForm() {
  const { setOpenState } = useLoadingOverlay();
  const { owners, ownersLoading } = useOwners();
  const { veterinarians, veterinariansLoading } = useVeterinarians();
  const [formToShow, setFormToShow] = useState<"owner" | "veterinarian" | null>(
    null
  );

  useEffect(() => {
    setOpenState(ownersLoading || veterinariansLoading);
  }, [ownersLoading, veterinariansLoading, setOpenState]);

  const handleCloseFormToShow = () => setFormToShow(null);

  return (
    <Grid container spacing={5} component="form" className={styles["pet-form"]}>
      <Grid size={6}>
        <Input label="Nombre" placeholder="Escribe tu nombre aquí" />
      </Grid>
      <Grid size={4} display="flex" alignItems="flex-end">
        <Calendar label="Fecha de nacimiento" />
      </Grid>
      <Grid size={2} display="flex" alignItems="flex-end">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="F"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="F"
              control={<Radio className={styles["radio-btn"]} />}
              label="Female"
            />
            <FormControlLabel
              value="M"
              control={<Radio className={styles["radio-btn"]} />}
              label="Male"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid size={6}>
        <Input label="Raza" placeholder="Escribe la raza de la mascota aquí" />
      </Grid>
      <Grid size={6}>
        <Input
          label="Color"
          placeholder="Escribe el color de la mascota aquí"
        />
      </Grid>
      <Grid size={6}>
        <Select
          label="Dueño"
          onAddBtnClick={() => setFormToShow("owner")}
          items={owners?.map((o) => ({
            label: `${o.names} ${o.last_names}`,
            value: o.id_owner,
          }))}
        />
      </Grid>
      <Grid size={6}>
        <Select
          label="Veterinario"
          onAddBtnClick={() => setFormToShow("veterinarian")}
          items={veterinarians?.map((v) => ({
            label: `${v.names} ${v.last_names}`,
            value: v.id_veterinarian,
          }))}
        />
      </Grid>
      <Grid size={6}>
        <Input
          multiline
          label="Información extra (alergias, comportamiento, etc.)"
          placeholder="Escribe la información extra aquí"
          rows={4}
        />
      </Grid>
      <Grid size={6} display="flex" justifyContent="center" alignItems="center">
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "var(--lightGreen)",
            width: "75%",
            padding: "15px 0",
          }}
        >
          Agregar
        </Button>
      </Grid>
      <Modal open={formToShow == "owner"} onClose={handleCloseFormToShow}>
        <OwnerForm onSuccessForm={handleCloseFormToShow} />
      </Modal>
      <Modal
        open={formToShow == "veterinarian"}
        onClose={handleCloseFormToShow}
      >
        <VeterinarianForm onSuccessForm={handleCloseFormToShow} />
      </Modal>
    </Grid>
  );
}
