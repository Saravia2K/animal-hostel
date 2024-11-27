"use client";

import { Button, CircularProgress, Grid2 as Grid } from "@mui/material";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Input from "@/components/Input";
import Title from "@/components/Title";

import createOwner from "@/services/owners/createOwner";
import updateOwner from "@/services/owners/updateOwner";
import useOwners from "@/hooks/useOwners";
import useIsResponsive from "@/hooks/useIsResponsive";

export default function OwnerForm({
  initialValues,
  onSuccessForm,
  independent,
}: TProps) {
  const { reloadOwners } = useOwners();
  const isResponsive = useIsResponsive();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TFormValues>({
    defaultValues: {
      names: initialValues?.names || "",
      last_names: initialValues?.last_names || "",
      home: initialValues?.home || "",
      cellphone: initialValues?.cellphone || "",
      email: initialValues?.email || "",
    },
  });

  const handleFormSubmit: SubmitHandler<TFormValues> = async (data) => {
    try {
      let success: boolean;
      if (initialValues?.id_owner == undefined) {
        success = await createOwner(data);
      } else {
        success = await updateOwner(initialValues.id_owner, data);
      }

      const baseMessage = success
        ? "Dueño {keyword} con éxito"
        : "Error al {keyword} un dueño";
      const successKeyword = initialValues?.id_owner ? "actualizado" : "creado";
      const notSuccessKeyword = initialValues?.id_owner
        ? "actualizar"
        : "crear";
      const message = baseMessage.replace(
        "{keyword}",
        success ? successKeyword : notSuccessKeyword
      );

      if (success) {
        await reloadOwners();

        if (onSuccessForm) onSuccessForm();
      }

      toast(message, {
        type: success ? "success" : "error",
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.error(error);

      const verb = initialValues?.id_owner ? "actualizar" : "crear";
      toast(`Error al ${verb} un dueño`, {
        type: "error",
      });
    }
  };

  const submitHandler = handleSubmit(handleFormSubmit);

  return (
    <Grid
      container
      component="form"
      spacing={3}
      borderRadius={independent ? 3 : 0}
      p={independent ? 7 : 0}
      sx={{
        width: independent || isResponsive ? "100%" : "50dvw",
        backgroundColor: "#fff",
      }}
    >
      {!independent && (
        <Grid size={12}>
          <Title
            text={
              initialValues?.id_owner ? "Actualizar dueño" : "Agregar dueño"
            }
          />
        </Grid>
      )}
      <Grid size={{ xs: 12, md: 6 }}>
        <Input
          required
          label="Nombres"
          placeholder="Escriba los nombres aquí"
          {...register("names")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Input
          required
          label="Apellidos"
          placeholder="Escriba los apellidos aquí"
          {...register("last_names")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Input
          required
          label="Email"
          placeholder="Escriba el email aquí"
          type="email"
          {...register("email")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
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
        <Input
          required
          label="Dirección"
          placeholder="Escriba la dirección aquí"
          {...register("home")}
        />
      </Grid>
      <Grid size={12}>
        <Button
          disabled={isSubmitting}
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
          ) : initialValues?.id_owner ? (
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
  email: string;
  cellphone: string;
  home: string;
};

type TProps = {
  initialValues?: {
    id_owner?: number;
  } & Partial<TFormValues>;
  onSuccessForm?: () => void;
  independent?: boolean;
};
