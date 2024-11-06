"use client";

import { Fragment } from "react";
import dayjs from "dayjs";
import { Grid2 as Grid, IconButton, Typography } from "@mui/material";
import jsPDF from "jspdf";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

import Title from "@/components/Title";
import CardInformation from "@/components/CardInformation";

import useEntry from "@/hooks/useEntry";
import { COLORS } from "@/consts";

export default function EntryDetailsModel({ id }: { id: number }) {
  const { entry } = useEntry(id);

  const generatePDF = () => {
    if (!entry) return;

    const pdf = new jsPDF();
    const entryDateTime = dayjs(entry.entry_date);
    const exitDateTime = dayjs(entry.exit_date);

    const column1X = 20,
      column2X = 110;

    // Configuración de estilos
    pdf.setFontSize(22);
    pdf.setTextColor(COLORS.darkGreen);
    pdf.text("Detalle de ingreso", 20, 20);

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);

    // Mascota
    pdf.text("Mascota", column1X, 40);
    pdf.text(entry.pet.name, column1X, 45);

    // Fecha y hora de entrada y egreso
    pdf.text("Fecha de entrada", column1X, 60);
    pdf.text("Fecha de egreso", column2X, 60);

    pdf.text(entryDateTime.format("DD/MM/YYYY"), column1X, 65);
    pdf.text(exitDateTime.format("DD/MM/YYYY"), column2X, 65);

    pdf.text("Hora de ingreso", column1X, 80);
    pdf.text("Hora de egreso", column2X, 80);

    pdf.text(entryDateTime.format("hh:mm A"), column1X, 85);
    pdf.text(exitDateTime.format("hh:mm A"), column2X, 85);

    let lastQuestionY = 100;
    for (const q of entry.questionnaires) {
      pdf.setTextColor(COLORS.lightGreen);
      pdf.text(q.question.text, column1X, lastQuestionY);
      pdf.setTextColor(0, 0, 0);
      pdf.text(q.answer, column1X, lastQuestionY + 10);

      lastQuestionY += 30;
    }

    // Observaciones generales
    pdf.setTextColor(COLORS.orange);
    pdf.setFontSize(20);
    pdf.text("Observaciones generales", column1X, lastQuestionY + 10);
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(entry.annotations, column1X, lastQuestionY + 20);

    // Descargar el PDF
    pdf.save(
      `${entry.pet.name.toLowerCase()}_${new Date().getTime()}_detalle_ingreso.pdf`
    );
  };

  if (!entry) return <></>;

  const entryDateTime = dayjs(entry.entry_date);
  const exitDateTime = dayjs(entry.exit_date);
  return (
    <Grid container columns={12} spacing={2} width={700}>
      <Grid size={10}>
        <Title text="Detalle de ingreso" mb={0} />
      </Grid>
      <Grid
        size={2}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <IconButton onClick={generatePDF}>
          <DownloadForOfflineIcon
            sx={{ color: "var(--orange)", fontSize: 50 }}
          />
        </IconButton>
      </Grid>

      <Grid size={12}>
        <CardInformation header="Mascota" text={entry.pet.name} />
      </Grid>

      <Grid size={6}>
        <CardInformation
          header="Fecha de entrada"
          text={entryDateTime.format("DD/MM/YYYY")}
        />
      </Grid>
      <Grid size={6}>
        <CardInformation
          header="Fecha de salida"
          text={exitDateTime.format("DD/MM/YYYY")}
        />
      </Grid>

      <Grid size={6}>
        <CardInformation
          header="hora de entrada"
          text={entryDateTime.format("hh:mm A")}
        />
      </Grid>
      <Grid size={6}>
        <CardInformation
          header="hora de salida"
          text={exitDateTime.format("hh:mm A")}
        />
      </Grid>

      {entry.questionnaires.map((q) => (
        <Fragment key={q.id_questionnaire}>
          <Grid size={12}>
            <Typography
              fontFamily="inherit"
              fontSize={16}
              fontWeight="bold"
              color="var(--darkGreen)"
            >
              {q.question.text}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography fontFamily="inherit" fontSize={16}>
              {q.answer}
            </Typography>
          </Grid>
        </Fragment>
      ))}

      <Grid size={12}>
        <Typography
          fontFamily="inherit"
          fontSize={20}
          fontWeight="bold"
          color="var(--orange)"
        >
          Observaciones
        </Typography>
      </Grid>
      <Grid size={12}>
        <Typography fontFamily="inherit" fontSize={16}>
          {entry.annotations}
        </Typography>
      </Grid>
    </Grid>
  );
}
