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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

const REQUIRED_MESSAGE = "Este campo es requerido";

export default function EntryForm({ initialValues, onSuccessForm }: TProps) {
  const { pets } = usePets();
  const { questions } = useQuestions();
  const { services } = useServices();

  const formValidationSchema = yup.object({
    entry_date: yup.string().required(REQUIRED_MESSAGE),
    entry_time: yup.string().required(REQUIRED_MESSAGE),
    exit_date: yup.string().required(REQUIRED_MESSAGE),
    exit_time: yup.string().required(REQUIRED_MESSAGE),
    id_pet: yup.number().required(REQUIRED_MESSAGE),
    answers: yup
      .array()
      .of(yup.string().required("Respuesta obligatoria"))
      .length(questions?.length || 0, "Debes responder todas las preguntas")
      .required(REQUIRED_MESSAGE),
    observations: yup.string().required(REQUIRED_MESSAGE),
    services: yup
      .array()
      .of(yup.number().required())
      .min(1, "Debes seleccionar al menos 1 servicio")
      .required(REQUIRED_MESSAGE),
    total: yup
      .number()
      .min(1, "Selecciona un valor mayor a 0")
      .required(REQUIRED_MESSAGE),
    advance_payment: yup
      .number()
      .typeError("El valor debe ser un número mayor o igual a 0")
      .min(0, "Selecciona un valor mayor o igual a 0")
      .required(REQUIRED_MESSAGE),
  });
  const {
    register,
    control,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting, errors },
    reset,
    watch,
    setValue,
    getValues,
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
    resolver: yupResolver(formValidationSchema),
  });

  const inDate = watch("entry_date");
  const inTime = watch("entry_time");
  const outDate = watch("exit_date");
  const total = watch("total");
  const formServices = watch("services");

  useEffect(() => {
    if (initialValues) reset(initialValues);
  }, [initialValues, reset]);

  useEffect(() => {
    setValue("exit_time", dayjs(inTime).add(1, "minute").toISOString());
  }, [outDate, inTime, setValue]);

  const combineDateAndTime = (date: string, time: string) => {
    const combined = dayjs(date)
      .set("hour", dayjs(time).hour())
      .set("minute", dayjs(time).minute());
    return combined.toISOString();
  };

  const handleFormSubmit: SubmitHandler<TFormValues> = async (data) => {
    try {
      const formattedData = {
        id_pet: data.id_pet,
        entry_date: combineDateAndTime(data.entry_date, data.entry_time),
        exit_date: combineDateAndTime(data.exit_date, data.exit_time),
        annotations: data.observations,
        services: data.services,
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

      if (success && onSuccessForm) {
        onSuccessForm();
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

  const handleCheckboxChange = (checked: boolean, id: number) => {
    const servicesList = [...getValues("services")];

    if (checked) {
      servicesList.push(id);
    }
    if (!checked) {
      const idx = servicesList.indexOf(id);
      servicesList.splice(idx, 1);
    }

    setValue("services", servicesList);

    const servicesErrors = errors.services?.length || 0;
    if (servicesErrors > 0) clearErrors("services");
  };

  const exitSameDateThatGotIn = () => {
    const inDateObj = new Date(inDate);
    const outDateObj = new Date(outDate);

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    };

    return formatDate(inDateObj) == formatDate(outDateObj);
  };

  if (!pets || !services || !questions) return <></>;
  return (
    <Grid
      container
      spacing={5}
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Fecha y Hora de Ingreso */}
      <Grid size={{ xs: 12, sm: 6 }}>
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
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
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
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="exit_date"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <Calendar
              label="Fecha de salida"
              value={dayjs(field.value)}
              onChange={field.onChange}
              error={!!errors.exit_date}
              helperText={errors.exit_date?.message}
              minDate={dayjs(inDate)}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="exit_time"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field }) => (
            <Clock
              label="Hora de salida"
              value={dayjs(field.value)}
              onChange={field.onChange}
              minTime={
                exitSameDateThatGotIn() ? dayjs(new Date(inTime)) : undefined
              }
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
              items={pets?.map((p) => ({
                label: `${p.name} - ${p.owner.names} ${p.owner.last_names}`,
                value: p.id_pet,
              }))}
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
              checked={formServices.includes(service.id_service)}
              onChange={(_, c) => handleCheckboxChange(c, service.id_service)}
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
          <Grid
            size={{ xs: 12, md: 6 }}
            display="flex"
            alignItems="center"
            fontWeight={5}
          >
            <Typography fontFamily="inherit" fontWeight="bold" fontSize={20}>
              {q.text}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
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
      <Grid
        size={{ xs: 12, md: 6 }}
        display="flex"
        alignItems="center"
        fontWeight={5}
      >
        <Typography fontFamily="inherit" fontWeight="bold" fontSize={20}>
          Observaciones generales:
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Input
          multiline
          label="Observaciones"
          rows={5}
          {...register("observations")}
          error={!!errors.observations}
          helperText={errors.observations?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
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

      <Grid size={{ xs: 12, sm: 6 }}>
        <Input
          {...register("advance_payment")}
          label="Anticipo"
          type="number"
          helperText={errors.advance_payment?.message}
          error={!!errors.advance_payment?.message}
          slotProps={{
            htmlInput: {
              min: 0,
              max: total,
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
