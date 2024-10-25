"use client";

import { useEffect, Fragment } from "react";
import {
  Button,
  Typography,
  FormControl,
  Grid2 as Grid,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import Input from "@/components/Input";
import Calendar from "@/components/Calendar";
import Clock from "@/components/Clock";
import Select from "@/components/Select";
import Checkbox from "@/components/Checkbox";
import Title from "@/components/Title";

import usePets from "@/hooks/usePets";
import useQuestions from "@/hooks/useQuestions";
import useServices from "@/hooks/useServices";
import createEntry from "@/services/entries/createEntry";
import updateEntry from "@/services/entries/updateEntry";

export default function EntryForm({ initialValues, onSuccessForm }: TProps) {
  const { pets } = usePets();
  const { questions } = useQuestions();
  const { services } = useServices();

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
    reset,
    watch,
  } = useForm<TFormValues>({
    defaultValues: {
      entry_date: initialValues?.entry_date || new Date().toDateString(),
      entry_time: initialValues?.entry_time || new Date().toDateString(),
      exit_date: initialValues?.exit_date || "",
      exit_time: initialValues?.exit_time || "",
      id_pet: initialValues?.id_pet || 0,
      answers: initialValues?.answers || [],
      observations: initialValues?.observations || "",
      services: initialValues?.services || [],
      total: initialValues?.total || 0,
      advance_payment: initialValues?.advance_payment || 0,
    },
  });

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  const combineDateAndTime = (date: string, time: string) => {
    const combined = dayjs(date)
      .set("hour", dayjs(time).hour())
      .set("minute", dayjs(time).minute());
    return combined.toISOString();
  };

  const handleFormSubmit: SubmitHandler<TFormValues> = async (data) => {
    try {
      const services = data.services.filter(Boolean);
      if (services.length == 0) {
        setError("services", {
          message: "Debes elegir al menos un servicio",
        });
        return;
      }
      clearErrors("services");

      const formattedData = {
        id_pet: data.id_pet,
        entry_date: combineDateAndTime(data.entry_date, data.entry_time),
        exit_date: combineDateAndTime(data.exit_date, data.exit_time),
        annotations: data.observations,
        services,
        questionnaire:
          questions?.map((q, index) => ({
            id_question: q.id_question,
            answer: data.answers[index] || "",
          })) || [],
        total: data.total,
        advance_payment: data.advance_payment,
      };

      let success: boolean;
      if (initialValues?.id_entry == undefined) {
        success = await createEntry(formattedData);
      } else {
        success = await updateEntry(initialValues.id_entry, formattedData);
      }

      const baseMessage = success
        ? "Entrada {keyword} con éxito"
        : "Error al {keyword} la entrada";
      const successKeyword = initialValues?.id_entry ? "actualizada" : "creada";
      const notSuccessKeyword = initialValues?.id_entry
        ? "actualizar"
        : "crear";
      const message = baseMessage.replace(
        "{keyword}",
        success ? successKeyword : notSuccessKeyword
      );

      if (success) {
        if (onSuccessForm) onSuccessForm();
      }

      toast(message, {
        type: success ? "success" : "error",
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.error(error);

      const verb = initialValues?.id_entry ? "actualizar" : "crear";
      toast(`Error al ${verb} la entrada`, {
        type: "error",
      });
    }
  };

  const inDate = watch("entry_date");
  return (
    <Grid
      container
      spacing={5}
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Fecha y Hora de Ingreso */}
      <Grid size={6}>
        <Controller
          name="entry_date"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <Calendar
              label="Fecha de ingreso"
              value={dayjs(field.value)}
              onChange={field.onChange}
              error={!!errors.entry_date}
              helperText={errors.entry_date?.message}
              minDate={dayjs(new Date())}
            />
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          name="entry_time"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <Clock
              label="Hora de ingreso"
              value={dayjs(field.value)}
              onChange={field.onChange}
              error={!!errors.entry_time}
              helperText={errors.entry_time?.message}
            />
          )}
        />
      </Grid>

      {/* Fecha y Hora de Egreso */}
      <Grid size={6}>
        <Controller
          name="exit_date"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <Calendar
              label="Fecha de egreso"
              value={dayjs(field.value)}
              onChange={field.onChange}
              error={!!errors.exit_date}
              helperText={errors.exit_date?.message}
              minDate={dayjs(inDate)}
            />
          )}
        />
      </Grid>
      <Grid size={6}>
        <Controller
          name="exit_time"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <Clock
              label="Hora de egreso"
              value={dayjs(field.value)}
              onChange={field.onChange}
              error={!!errors.exit_time}
              helperText={errors.exit_time?.message}
            />
          )}
        />
      </Grid>

      {/* Select de Mascota */}
      <Grid size={12}>
        <Controller
          name="id_pet"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <Select
              label="Mascota a ingresar"
              items={pets?.map((p) => ({ label: p.name, value: p.id_pet }))}
              {...field}
              error={!!errors.id_pet}
              helperText={errors.id_pet?.message}
            />
          )}
        />
      </Grid>

      {/* Servicios */}
      <Grid size={12}>
        <Title text="Servicios" mb={1} fontSize={20} />
        <FormControl>
          {services?.map((service, i) => (
            <Checkbox
              key={i}
              value={service.id_service}
              label={service.name}
              {...register(`services.${i}`)}
            />
          ))}
          {errors.services && (
            <FormHelperText error>{errors.services.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>

      {/* Preguntas */}
      {questions?.map((q, index) => (
        <Fragment key={q.id_question}>
          <Grid size={6} display="flex" alignItems="center" fontWeight={5}>
            <Typography fontFamily="inherit" fontWeight="bold" fontSize={20}>
              {q.text}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Input
              multiline
              label="Respuesta"
              rows={5}
              {...register(`answers.${index}`, { required: "Campo requerido" })}
              error={!!errors.answers?.[index]}
              helperText={errors.answers?.[index]?.message}
            />
          </Grid>
        </Fragment>
      ))}

      {/* Observaciones Generales */}
      <Grid size={6} display="flex" alignItems="center" fontWeight={5}>
        <Typography fontFamily="inherit" fontWeight="bold" fontSize={20}>
          Observaciones generales:
        </Typography>
      </Grid>
      <Grid size={6}>
        <Input
          multiline
          label="Observaciones"
          rows={5}
          {...register("observations")}
          error={!!errors.observations}
          helperText={errors.observations?.message}
        />
      </Grid>

      <Grid size={6}>
        <Input
          {...register("total")}
          label="Total"
          type="number"
          slotProps={{
            htmlInput: {
              min: 0,
            },
          }}
        />
      </Grid>

      <Grid size={6}>
        <Input
          {...register("advance_payment")}
          label="Avance del pago"
          type="number"
          slotProps={{
            htmlInput: {
              min: 0,
            },
          }}
        />
      </Grid>

      {/* Botón de Enviar */}
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
        >
          {isSubmitting ? (
            <CircularProgress sx={{ color: "var(--orange)" }} />
          ) : initialValues?.id_entry ? (
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
  entry_date: string;
  entry_time: string;
  exit_date: string;
  exit_time: string;
  id_pet: number;
  observations: string;
  answers: string[];
  services: number[];
  total: number;
  advance_payment: number;
};

type TProps = {
  initialValues?: Partial<TFormValues> & { id_entry?: number };
  onSuccessForm?: () => void;
};
