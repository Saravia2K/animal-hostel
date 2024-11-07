"use client";

import { Button, Grid2 as Grid } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import Input from "@/components/Input";

import createService from "@/services/services/createService";
import updateService from "@/services/services/updateService";

type TFormValues = {
  name: string;
  description: string;
};

type TProps = {
  initialValues?: Partial<TFormValues> & { id_service?: number };
  onSuccessForm?: () => void;
};

export default function Form({ initialValues, onSuccessForm }: TProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<TFormValues>({
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
    },
  });

  const handleFormSubmit: SubmitHandler<TFormValues> = async (data) => {
    try {
      let success: boolean;
      if (initialValues?.id_service == undefined) {
        // Create new service
        success = await createService(data);
      } else {
        // Update existing service
        success = await updateService(initialValues.id_service, data);
      }

      const baseMessage = success
        ? "Servicio {keyword} con éxito"
        : "Error al {keyword} el servicio";
      const successKeyword = initialValues?.id_service
        ? "actualizado"
        : "creado";
      const notSuccessKeyword = initialValues?.id_service
        ? "actualizar"
        : "crear";
      const message = baseMessage.replace(
        "{keyword}",
        success ? successKeyword : notSuccessKeyword
      );

      if (success && onSuccessForm) onSuccessForm();

      toast(message, {
        type: success ? "success" : "error",
      });

      if (success) reset();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast("Error al enviar el formulario", {
        type: "error",
      });
    }
  };

  return (
    <Grid
      container
      component="form"
      spacing={3}
      width={600}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Grid size={12}>
        <Input
          label="Nombre del servicio"
          placeholder="Escribe el nombre del servicio aquí"
          {...register("name", { required: "Este campo es requerido" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </Grid>
      <Grid size={12}>
        <Input
          label="Descripción del servicio"
          placeholder="Escribe la descripción del servicio aquí"
          multiline
          rows={4}
          {...register("description", { required: "Este campo es requerido" })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Grid>
      <Grid size={12}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "var(--lightGreen)" }}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Enviando..."
            : initialValues?.id_service
            ? "Actualizar"
            : "Agregar"}
        </Button>
      </Grid>
    </Grid>
  );
}
