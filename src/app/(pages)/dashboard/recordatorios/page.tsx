"use client";

import { type MouseEvent, useState } from "react";
import { Box, Button, Grid2 as Grid } from "@mui/material";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";

import Title from "@/components/Title";
import EntryDetailsModal from "@/components/EntryDetailsModal";

import useEntriesByDate from "@/hooks/useEntriesByDate";
import useLoadingOverlay from "@/hooks/useLoadingOverlay";
import updateEntry from "@/services/entries/updateEntry";
import useIsResponsive from "@/hooks/useIsResponsive";

export default function RecordatoriosPage() {
  const [detailsId, setDetailsId] = useState<number>();
  const { entries, reloadEntries } = useEntriesByDate();
  const loadingOverlay = useLoadingOverlay();
  const isResponsive = useIsResponsive();

  const handleMarkAsSeen = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: number
  ) => {
    try {
      event.stopPropagation();
      loadingOverlay.show();
      const success = updateEntry(id, {
        notification_seen: true,
      });

      if (!success)
        throw new Error("Error trying to mark as seen a notification");

      reloadEntries();
    } catch (error) {
      if (process.env.NODE_ENV == "development") console.error(error);
      toast("Error al intentar marcar como leída una notificación", {
        type: "error",
      });
    }
  };

  if (!entries) return;
  const listFormater = new Intl.ListFormat("es", {
    style: "long",
    type: "conjunction",
  });
  return (
    <>
      <Title text="Recordatorios" />
      <Grid container spacing={2}>
        {entries.map((e) => (
          <Grid size={12} key={e.id_entry}>
            <Box
              px={3}
              py={5}
              bgcolor="#fff"
              borderRadius={3}
              fontSize={25}
              fontWeight={e.notification_seen ? "normal" : "bold"}
              display="flex"
              justifyContent="space-between"
              flexDirection={isResponsive ? "column" : "row"}
              gap={isResponsive ? 2 : 0}
              onClick={() => setDetailsId(e.id_entry)}
              sx={{ cursor: "pointer" }}
            >
              <Box fontSize={isResponsive ? 20 : 25}>
                <Box component="span" color="var(--orange)">
                  ¡Recordatorio!
                </Box>{" "}
                {e.pet.name} tienen una cita de{" "}
                {listFormater.format(e.services.map((s) => s.name))} hoy a las{" "}
                {dayjs(e.entry_date).format("hh:mm A")}.
              </Box>
              <Box>
                {e.notification_seen ? (
                  <CheckIcon sx={{ color: "var(--orange)", fontSize: 40 }} />
                ) : (
                  <Button
                    variant="contained"
                    onClick={(ev) => handleMarkAsSeen(ev, e.id_entry)}
                    sx={{ backgroundColor: "var(--orange)" }}
                  >
                    Marcar como leído
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
        {detailsId != undefined && (
          <EntryDetailsModal
            open={true}
            onClose={() => setDetailsId(undefined)}
            id={detailsId}
          />
        )}
      </Grid>
    </>
  );
}
