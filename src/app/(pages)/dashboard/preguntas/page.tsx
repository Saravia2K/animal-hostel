"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import Table from "@/components/Table";
import Title from "@/components/Title";
import Modal from "@/components/Modal";
import Form from "./Form";

import useQuestions from "@/hooks/useQuestions";
import deleteQuestion from "@/services/questions/deleteQuestion";

export default function PreguntasPage() {
  const { questions, reloadQuestions } = useQuestions();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleSuccessForm = () => {
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["entries"] });
    qc.invalidateQueries({ queryKey: ["pets"] });
  };

  const handleDeleteIconClick = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar esta pregunta?",
      text: "Una vez eliminada la pregunta, no podrán recuperarse las respuestas en las mascotas",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      preConfirm: async () => {
        try {
          const deleted = await deleteQuestion(id);

          if (!deleted) throw Error("Error trying to delete service");

          return true;
        } catch (error) {
          if (process.env.NODE_ENV == "development") console.error(error);
          Swal.showValidationMessage("Error al intentar eliminar el servicio");
        }
      },
    }).then(async (v) => {
      if (v.isConfirmed) {
        reloadQuestions();
        toast("Pregunta eliminada exitosamente", {
          type: "info",
        });
        qc.invalidateQueries({ queryKey: ["pets"] });
        qc.invalidateQueries({ queryKey: ["entries"] });
      }
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Title text="Preguntas" mb={0} />
        <Button
          variant="contained"
          sx={{ backgroundColor: "var(--lightGreen)" }}
          onClick={() => setOpen(true)}
        >
          Agregar pregunta
        </Button>
      </Box>
      <Box mt={7} p={3} borderRadius={2} bgcolor="#fff">
        <Table<TTableData>
          headers={[
            { id: "id", label: "ID" },
            { id: "text", label: "Pregunta" },
          ]}
          data={
            questions?.map((q) => ({
              id: q.id_question,
              text: q.text,
            })) ?? []
          }
          actions={{
            delete: (row) => handleDeleteIconClick(row.id),
          }}
        />
      </Box>
      <Modal open={open} onClose={handleModalClose}>
        <Form onSuccessForm={handleSuccessForm} />
      </Modal>
    </>
  );
}

type TTableData = {
  id: number;
  text: string;
};
