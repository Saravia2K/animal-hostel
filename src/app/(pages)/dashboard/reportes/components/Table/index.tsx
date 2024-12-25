"use client";

import { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PaymentIcon from "@mui/icons-material/Payment";

import { EntryDetailsModal } from "@/components/EntryDetails";
import PaymentModal from "../PaymentModal";

import deleteEntry from "@/services/entries/deleteEntry";
import useIsResponsive from "@/hooks/useIsResponsive";
import useEntries from "@/hooks/useEntries";
import dayjs from "dayjs";

export default function Table({ data }: TProps) {
  const { reloadEntries } = useEntries();
  const [entryDetails, setEntryDetails] = useState<TDataRow>();
  const [entryToPay, setEntryToPay] = useState<TDataRow>();
  const router = useRouter();
  const isResponsive = useIsResponsive();

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
        reloadEntries();
        toast("Entrada eliminada exitosamente", {
          type: "info",
        });
      }
    });
  };

  const handleWatchActionClick = (row: TDataRow) => {
    if (!isResponsive) {
      setEntryDetails(row);
      return;
    }

    router.push(`/dashboard/reportes/${row.id}`);
  };

  const columns: GridColDef<TDataRow>[] = [
    { field: "id", headerName: "ID" },
    { field: "fecha_ingreso", headerName: "Fecha de ingreso", flex: 1 },
    { field: "hora_ingreso", headerName: "Hora de ingreso", flex: 1 },
    { field: "fecha_salida", headerName: "Fecha de salida", flex: 1 },
    { field: "hora_salida", headerName: "Hora de salida", flex: 1 },
    { field: "pet", headerName: "Mascota", flex: 1 },
    { field: "services", headerName: "Servicios", flex: 1 },
    {
      field: "total",
      headerName: "Total",
      valueFormatter: (value: number) => USDollarFormatter.format(value),
      flex: 1,
    },
    {
      field: "remaining",
      headerName: "Monto restante",
      valueFormatter: (value: number) => USDollarFormatter.format(value),
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      getActions: ({ row }) => {
        const actions = [
          <GridActionsCellItem
            key={0}
            icon={<VisibilityIcon sx={{ color: "var(--orange)" }} />}
            label="Ver"
            onClick={() => handleWatchActionClick(row)}
          />,
          <GridActionsCellItem
            key={1}
            icon={<DeleteIcon color="error" />}
            label="Eliminar"
            onClick={() => handleDeleteBtn(row.id)}
          />,
        ];

        // Checking if entry date has already past
        const [day, month, year] = row.fecha_ingreso.split("/").map(Number);
        const fechaIngresoDate = new Date();
        fechaIngresoDate.setFullYear(year, month - 1, day);
        if (dayjs(fechaIngresoDate).isAfter(dayjs()))
          actions.push(
            <GridActionsCellItem
              key={2}
              icon={<EditIcon sx={{ color: "var(--lightGreen)" }} />}
              label="Editar"
              onClick={() =>
                router.push(`/dashboard/reportes/${row.id}/editar`)
              }
            />
          );

        if (row.remaining > 0)
          actions.push(
            <GridActionsCellItem
              key={2}
              icon={<PaymentIcon sx={{ color: "var(--lightGreen)" }} />}
              label="Abonar"
              onClick={() => setEntryToPay(row)}
            />
          );

        return actions;
      },
      flex: 1,
    },
  ];

  return (
    <>
      <DataGrid
        disableRowSelectionOnClick
        disableColumnMenu
        columns={columns}
        rows={data}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
          pagination: {
            paginationModel: { pageSize: 25 },
          },
        }}
        slotProps={{
          pagination: {
            labelRowsPerPage: "Reportes por página:",
            labelDisplayedRows: ({ from, to, count }) =>
              `${from}-${to} de ${count}`,
          },
        }}
        pageSizeOptions={[25, 50, 75, 100, { value: -1, label: "Todos" }]}
      />
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
    </>
  );
}

const USDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export type TDataRow = {
  id: number;
  fecha_ingreso: string;
  hora_ingreso: string;
  fecha_salida: string;
  hora_salida: string;
  pet: string;
  services: string[];
  remaining: number;
  total: number;
};

type TProps = {
  data: TDataRow[];
};
