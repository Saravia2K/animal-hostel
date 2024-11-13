"use client";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Grid2 as Grid } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Title from "@/components/Title";

import updateEntry from "@/services/entries/updateEntry";
import { type TEntryTableField } from "./page";

export default function PaymentModal({ onClose, entry }: TPaymentModalProps) {
  const qc = useQueryClient();

  const remainingNumber = +entry.remaining.replace("$", "");
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TFormValues>({
    defaultValues: {
      payment: remainingNumber.toString(),
    },
  });

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    const paymentAmount = Number(data.payment);
    const total = Number(entry.total.replace("$", ""));

    const success = await updateEntry(entry.id, {
      advance_payment: total - remainingNumber + paymentAmount,
    });

    if (success) {
      onClose();
      qc.invalidateQueries({ queryKey: ["entries"], exact: true });
      qc.invalidateQueries({ queryKey: ["entries", entry.id] });
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box width={600}>
        <Title text="Agregar abono" />
        <Grid
          container
          spacing={4}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid size={12}>
            <Controller
              name="payment"
              control={control}
              rules={{
                required: "El monto del abono es requerido",
                min: {
                  value: 0,
                  message: "El monto debe ser mayor o igual a 0",
                },
                max: {
                  value: remainingNumber,
                  message: `El monto no debe exceder el saldo restante de ${entry.remaining}`,
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="$$$"
                  label="Monto del abono"
                  error={!!errors.payment}
                  helperText={errors.payment?.message}
                  type="number"
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                backgroundColor: "var(--lightGreen)",
                width: "100%",
                padding: "15px 0",
              }}
            >
              {isSubmitting ? "Procesando..." : "Abonar"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

type TPaymentModalProps = { onClose: () => void; entry: TEntryTableField };
type TFormValues = {
  payment: string;
};
