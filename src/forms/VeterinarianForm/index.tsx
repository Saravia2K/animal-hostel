"use client";

import { Button, CircularProgress, Grid2 as Grid } from "@mui/material";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Input from "@/components/Input";
import Title from "@/components/Title";

import createVeterinarian from "@/services/veterinarians/createVeterinarian";
import updateVeterinarian from "@/services/veterinarians/updateVeterinarian";
import useVeterinarians from "@/hooks/useVeterinarians";

export default function VeterinarianForm({
  initialValues,
  onSuccessForm,
}: TProps) {
  const { reloadVeterinarians } = useVeterinarians();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TFormValues>({
    defaultValues: {
      names: initialValues?.names || "",
      last_names: initialValues?.last_names || "",
      clinic_name: initialValues?.clinic_name || "",
      cellphone: initialValues?.cellphone || "",
    },
  });

  const handleFormSubmit: SubmitHandler<TFormValues> = async (data) => {
    try {
      let success: boolean;
      if (initialValues?.id_veterinarian == undefined) {
        success = await createVeterinarian(data);
      } else {
        success = await updateVeterinarian(initialValues.id_veterinarian, data);
      }

      const baseMessage = success
        ? "Veterinario {keyword} con éxito"
        : "Error al {keyword} un veterinario";
      const successKeyword = initialValues?.id_veterinarian
        ? "actualizado"
        : "creado";
      const notSuccessKeyword = initialValues?.id_veterinarian
        ? "actualizar"
        : "crear";
      const message = baseMessage.replace(
        "{keyword}",
        success ? successKeyword : notSuccessKeyword
      );

      if (success) {
        await reloadVeterinarians();

        if (onSuccessForm) onSuccessForm();
      }

      toast(message, {
        type: success ? "success" : "error",
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.error(error);

      const verb = initialValues?.id_veterinarian ? "actualizar" : "crear";
      toast(`Error al ${verb} un veterinario`, {
        type: "error",
      });
    }
  };

  const submitHandler = handleSubmit(handleFormSubmit);

  return (
    <Grid container component="form" spacing={3} sx={{ width: "50dvw" }}>
      <Grid size={12}>
        <Title
          text={
            initialValues?.id_veterinarian
              ? "Actualizar veterinario"
              : "Agregar veterinario"
          }
        />
      </Grid>
      <Grid size={6}>
        <Input
          required
          label="Nombres"
          placeholder="Escriba los nombres aquí"
          {...register("names")}
        />
      </Grid>
      <Grid size={6}>
        <Input
          required
          label="Apellidos"
          placeholder="Escriba los apellidos aquí"
          {...register("last_names")}
        />
      </Grid>
      <Grid size={6}>
        <Input
          required
          label="Nombre de clínica"
          placeholder="Escriba el nombre de la clínica aquí"
          {...register("clinic_name")}
        />
      </Grid>
      <Grid size={6}>
        <Input
          required
          label="Teléfono"
          placeholder="Escriba el teléfono aquí"
          type="tel"
          autoComplete="off"
          {...register("cellphone")}
        />
      </Grid>
      <Grid size={12}>
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "var(--lightGreen)",
            width: "100%",
            padding: "15px 0",
          }}
          onClick={submitHandler}
        >
          {isSubmitting ? (
            <CircularProgress sx={{ color: "var(--orange)" }} />
          ) : initialValues?.id_veterinarian ? (
            "Actualizar"
          ) : (
            "Agregar"
          )}
        </Button>
      </Grid>
    </Grid>
  );
}

type TFormValues = {
  names: string;
  last_names: string;
  clinic_name: string;
  cellphone: string;
};

type TProps = {
  initialValues?: {
    id_veterinarian?: number;
  } & Partial<TFormValues>;
  onSuccessForm?: () => void;
};
