"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Grid2 as Grid, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRouter } from "next-nprogress-bar";
import PaymentIcon from "@mui/icons-material/Payment";

import Table from "@/components/Table";
import Title from "@/components/Title";
import Select from "@/components/Select";
import Checkbox from "@/components/Checkbox";
import { EntryDetailsModal } from "@/components/EntryDetails";
import PaymentModal from "./PaymentModal";

import deleteEntry from "@/services/entries/deleteEntry";
import useEntries from "@/hooks/useEntries";
import useServices from "@/hooks/useServices";
import useIsResponsive from "@/hooks/useIsResponsive";
import { COLORS } from "@/consts";
import type { TEntry } from "@/types";

export default function ReportesPage() {
  const [entryDetails, setEntryDetails] = useState<TEntryTableField>();
  const [currentEntries, setCurrentEntries] = useState<TEntry[]>([]);
  const [filters, setFilters] = useState({
    month: 0,
    year: years[years.length - 1],
    services: [] as number[],
  });
  const [entryToPay, setEntryToPay] = useState<TEntryTableField>();
  const isResponsive = useIsResponsive();
  const { entries, reloadEntries } = useEntries();
  const { services } = useServices();
  const router = useRouter();

  /**
   * Filtros
   */
  useEffect(() => {
    if (!entries) return;

    const { month, year, services } = filters;

    // Filtro por año
    let filteredEntries = entries.filter(
      (e) => new Date(e.entry_date).getFullYear() == year
    );

    // Filtro por mes
    if (month > 0)
      filteredEntries = filteredEntries.filter(
        (fe) => new Date(fe.entry_date).getMonth() + 1 == month
      );

    // Filtro por servicio
    filteredEntries =
      services.length == 0
        ? entries
        : filteredEntries.filter((fe) =>
            services.length > 1
              ? fe.services.length >= services.length &&
                fe.services.every((fes) => services.includes(fes.id_service))
              : fe.services.some((fes) => services.includes(fes.id_service))
          );

    setCurrentEntries(filteredEntries);
  }, [filters, entries]);

  const toggleServiceInFilter = (serviceId: number, checked: boolean) => {
    const services = [...filters.services] as number[];

    if (checked && !services.includes(serviceId)) services.push(serviceId);

    if (!checked) {
      const idx = services.indexOf(serviceId);
      if (idx > -1) services.splice(idx, 1);
    }

    services.sort();
    setFilters((f) => ({ ...f, services }));
  };

  const handleDeleteBtn = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar esta entrada?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      preConfirm: async () => {
        try {
          const deleted = await deleteEntry(id);

          if (!deleted) throw Error("Error trying to delete an entry");

          return true;
        } catch (error) {
          if (process.env.NODE_ENV == "development") console.error(error);
          Swal.showValidationMessage("Error al intentar eliminar el cliente");
        }
      },
    }).then(async (v) => {
      if (v.isConfirmed) {
        await reloadEntries();
        toast("Entrada eliminada exitosamente", {
          type: "info",
        });
      }
    });
  };

  const handleWatchActionClick = (row: TEntryTableField) => {
    if (!isResponsive) {
      setEntryDetails(row);
      return;
    }

    router.push(`/dashboard/reportes/${row.id}`);
  };

  if (entries == undefined || services == undefined) return <></>;
  return (
    <Grid container spacing={5}>
      <Grid
        size={12}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Title text="Reportes" mb={0} />
      </Grid>
      <Grid size={12}>
        <Grid
          container
          columns={12}
          spacing={2}
          display="flex"
          alignItems="center"
        >
          <Grid size={{ xs: 12, sm: 3, md: 2 }}>
            <Typography
              fontFamily="inherit"
              color={COLORS.orange}
              fontWeight="bold"
              fontSize={25}
            >
              Filtrar por:
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Select
              items={months}
              value={filters.month}
              onChange={(e) =>
                setFilters((f) => ({ ...f, month: e.target.value as number }))
              }
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Select
              items={years.map((y) => ({
                label: y,
                value: y,
              }))}
              value={filters.year}
              onChange={(e) =>
                setFilters((f) => ({ ...f, year: e.target.value as number }))
              }
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          {services.map((s, i) => (
            <Grid
              key={i}
              size={{ xs: 12, sm: 6, md: 3 }}
              sx={{
                backgroundColor: "#fff",
                border: "2px solid var(--lightGreen)",
              }}
              p={1}
              borderRadius={3}
            >
              <Checkbox
                label={s.name}
                value={s.id_service}
                color={COLORS.lightGreen}
                onChange={(e) =>
                  toggleServiceInFilter(+e.target.value, e.target.checked)
                }
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid size={12} borderRadius={2} p={3} sx={{ backgroundColor: "#fff" }}>
        <Table<TEntryTableField>
          headers={[
            { id: "id", label: "ID" },
            { id: "fecha_ingreso", label: "Fecha de ingreso" },
            { id: "hora_ingreso", label: "Hora de ingreso" },
            { id: "fecha_salida", label: "Fecha de salida" },
            { id: "hora_salida", label: "Hora de salida" },
            { id: "pet", label: "Mascota" },
            { id: "services", label: "Servicios" },
            { id: "total", label: "Total" },
            { id: "remaining", label: "Monto restante" },
          ]}
          data={currentEntries.map((e) => {
            const entry = dayjs(e.entry_date);
            const exit = dayjs(e.exit_date);

            return {
              id: e.id_entry,
              fecha_ingreso: entry.format("DD/MM/YYYY"),
              hora_ingreso: entry.format("hh:mm A"),
              fecha_salida: exit.format("DD/MM/YYYY"),
              hora_salida: exit.format("hh:mm A"),
              pet: e.pet.name,
              services: e.services.map((s) => s.name).join(", "),
              remaining: `$${e.total - e.advance_payment}`,
              total: `$${e.total}`,
            };
          })}
          actions={{
            watch: handleWatchActionClick,
            delete: (row) => handleDeleteBtn(row.id),
            edit: (row) => router.push(`/dashboard/reportes/${row.id}/editar`),
          }}
          forceHideAction={{
            edit: (row) => dayjs(row.fecha_ingreso).isBefore(dayjs()),
          }}
          extraActions={[
            {
              icon: <PaymentIcon sx={{ color: "var(--lightGreen)" }} />,
              onClick: (row) => setEntryToPay(row),
              forceHideAction: (row) => row.remaining != "$0",
            },
          ]}
        />
      </Grid>
      {entryDetails != undefined && (
        <EntryDetailsModal
          open={true}
          onClose={() => setEntryDetails(undefined)}
          id={entryDetails.id}
        />
      )}
      {entryToPay != undefined && (
        <PaymentModal
          onClose={() => setEntryToPay(undefined)}
          entry={entryToPay}
        />
      )}
    </Grid>
  );
}

export type TEntryTableField = {
  id: number;
  fecha_ingreso: string;
  hora_ingreso: string;
  fecha_salida: string;
  hora_salida: string;
  pet: string;
  services: string[];
  remaining: string;
  total: string;
};

const months = [
  { label: "Mes", value: 0 },
  { label: "Enero", value: 1 },
  { label: "Febrero", value: 2 },
  { label: "Marzo", value: 3 },
  { label: "Abril", value: 4 },
  { label: "Mayo", value: 5 },
  { label: "Junio", value: 6 },
  { label: "Julio", value: 7 },
  { label: "Agosto", value: 8 },
  { label: "Septiembre", value: 9 },
  { label: "Octubre", value: 10 },
  { label: "Noviembre", value: 11 },
  { label: "Diciembre", value: 12 },
];

const years = Array.from(
  { length: new Date().getFullYear() + 1 - 2024 },
  (_, i) => 2024 + i
);
