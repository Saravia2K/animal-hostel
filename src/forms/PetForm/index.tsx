"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Radio,
  Button,
  RadioGroup,
  FormControl,
  Grid2 as Grid,
  FormControlLabel,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import Input from "@/components/Input";
import Calendar from "@/components/Calendar";
import Select from "@/components/Select";
import Modal from "@/components/Modal";
import OwnerForm from "../OwnerForm";
import VeterinarianForm from "../VeterinarianForm";

import useOwners from "@/hooks/useOwners";
import useVeterinarians from "@/hooks/useVeterinarians";
import usePets from "@/hooks/usePets";
import createPet from "@/services/pets/createPet";
import updatePet from "@/services/pets/updatePet";

import styles from "./PetForm.module.scss";
import { useRouter } from "next-nprogress-bar";

export default function PetForm({ initialValues, onSuccessForm }: TProps) {
  const { owners } = useOwners();
  const { veterinarians } = useVeterinarians();
  const { reloadPets } = usePets();
  const [formToShow, setFormToShow] = useState<"owner" | "veterinarian" | null>(
    null
  );
  const qc = useQueryClient();
  const router = useRouter();
  const MUITheme = useTheme();
  const isResponsive = useMediaQuery(MUITheme.breakpoints.down("md"));

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<TFormValues>({
    defaultValues: {
      name: initialValues?.name || "",
      birthday: initialValues?.birthday || "",
      sex: initialValues?.sex || "F",
      breed: initialValues?.breed || "",
      coat_color: initialValues?.coat_color || "",
      id_owner: initialValues?.id_owner || 0,
      id_veterinarian: initialValues?.id_veterinarian || 0,
      extra_data: initialValues?.extra_data || "",
    },
  });

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  const handleFormSubmit: SubmitHandler<TFormValues> = async (data) => {
    if (!data.extra_data) {
      data.extra_data = null;
    }

    try {
      let success: boolean;
      if (initialValues?.id_pet == undefined) {
        success = await createPet(data);
      } else {
        success = await updatePet(initialValues.id_pet, data);
      }

      const baseMessage = success
        ? "Mascota {keyword} con éxito"
        : "Error al {keyword} una mascota";
      const successKeyword = initialValues?.id_pet ? "actualizada" : "creada";
      const notSuccessKeyword = initialValues?.id_pet ? "actualizar" : "crear";
      const message = baseMessage.replace(
        "{keyword}",
        success ? successKeyword : notSuccessKeyword
      );

      if (success) {
        await reloadPets();
        qc.invalidateQueries({ queryKey: ["owners", data.id_owner] });
        if (onSuccessForm) onSuccessForm(data);
      }

      toast(message, {
        type: success ? "success" : "error",
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.error(error);

      const verb = initialValues?.id_pet ? "actualizar" : "crear";
      toast(`Error al ${verb} una mascota`, {
        type: "error",
      });
    }
  };

  const handleSubformOpen = (subform: "owner" | "veterinarian") => {
    if (!isResponsive) {
      setFormToShow(subform);
      return;
    }

    const pages = {
      owner: "clientes",
      veterinarian: "encargados",
    };
    router.push(`/dashboard/${pages[subform]}/agregar?from_mascotas=1`);
  };

  const handleCloseFormToShow = () => setFormToShow(null);

  return (
    <Grid
      container
      spacing={5}
      component="form"
      className={styles["pet-form"]}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Grid size={{ xs: 12, sm: 6 }}>
        <Input
          label="Nombre"
          placeholder="Escribe el nombre aquí"
          {...register("name", { required: "Este campo es requerido" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 6, md: 4 }}
        display="flex"
        alignItems="flex-end"
      >
        <Controller
          name="birthday"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <Calendar
              label="Fecha de nacimiento"
              value={dayjs(field.value)}
              onChange={field.onChange}
              error={!!errors.birthday}
              helperText={errors.birthday?.message}
              maxDate={dayjs()}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 4, sm: 6, md: 2 }} display="flex" alignItems="flex-end">
        <Controller
          name="sex"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          defaultValue={initialValues?.sex || "F"}
          render={({ field }) => (
            <FormControl>
              <RadioGroup {...field}>
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
          )}
        />
      </Grid>
      <Grid size={{ xs: 8, sm: 6 }}>
        <Input
          label="Raza"
          placeholder="Escribe la raza aquí"
          {...register("breed", { required: "Este campo es requerido" })}
          error={!!errors.breed}
          helperText={errors.breed?.message}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Input
          label="Color"
          placeholder="Escribe el color aquí"
          {...register("coat_color", { required: "Este campo es requerido" })}
          error={!!errors.coat_color}
          helperText={errors.coat_color?.message}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="id_owner"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <Select
              label="Dueño"
              onAddBtnClick={() => handleSubformOpen("owner")}
              items={owners?.map((o) => ({
                label: `${o.names} ${o.last_names}`,
                value: o.id_owner,
              }))}
              value={field.value || ""}
              onChange={field.onChange}
              error={!!errors.id_owner}
              helperText={errors.id_owner?.message}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="id_veterinarian"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <Select
              label="Encargado"
              onAddBtnClick={() => handleSubformOpen("veterinarian")}
              items={veterinarians?.map((v) => ({
                label: `${v.names} ${v.last_names}`,
                value: v.id_veterinarian,
              }))}
              value={field.value || ""}
              onChange={field.onChange}
              error={!!errors.id_veterinarian}
              helperText={errors.id_veterinarian?.message}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Input
          multiline
          label="Información extra (alergias, comportamiento, etc.)"
          placeholder="Escribe la información extra aquí"
          rows={4}
          {...register("extra_data")}
          error={!!errors.extra_data}
          helperText={errors.extra_data?.message}
        />
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "var(--lightGreen)",
            width: "75%",
            padding: "15px 0",
          }}
        >
          {isSubmitting ? (
            <CircularProgress sx={{ color: "var(--orange)" }} />
          ) : initialValues?.id_pet ? (
            "Actualizar"
          ) : (
            "Agregar"
          )}
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

type TFormValues = {
  name: string;
  birthday: string;
  sex: "M" | "F";
  breed: string;
  coat_color: string;
  id_owner: number;
  id_veterinarian: number;
  extra_data: string | null;
};

type TProps = {
  initialValues?: {
    id_pet?: number;
  } & Partial<TFormValues>;
  onSuccessForm?: (newPet: TFormValues) => void;
};
