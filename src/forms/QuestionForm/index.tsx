"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { Button, Grid2 as Grid, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

import Input from "@/components/Input";

import createQuestion from "@/services/questions/createQuestion";
import useQuestions from "@/hooks/useQuestions";
import GridForm from "@/components/GridForm";

export default function QuestionForm({ independent, onSuccessForm }: TProps) {
  const { reloadQuestions } = useQuestions();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<TFormValues>({
    defaultValues: {
      text: "",
    },
  });

  const handleFormSubmit: SubmitHandler<TFormValues> = async (data) => {
    const success = await createQuestion(data);

    if (success) {
      toast("Pregunta creada con éxito", { type: "success" });
      reloadQuestions();
      reset();
      if (onSuccessForm) onSuccessForm();
    } else {
      toast("Error al crear la pregunta", { type: "error" });
    }
  };

  return (
    <GridForm
      excludeTablets
      independent={independent}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Grid size={12}>
        <Input
          fullWidth
          label="Pregunta"
          placeholder="Escribe tu pregunta aquí"
          {...register("text", { required: "Este campo es requerido" })}
          error={!!errors.text}
          helperText={errors.text?.message}
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
          {isSubmitting ? (
            <CircularProgress sx={{ color: "var(--orange)" }} size={24} />
          ) : (
            "Agregar"
          )}
        </Button>
      </Grid>
    </GridForm>
  );
}

type TFormValues = {
  text: string;
};

type TProps = {
  independent?: boolean;
  onSuccessForm?: () => void;
};
