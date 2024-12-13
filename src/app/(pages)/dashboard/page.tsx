"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import dayjs from "dayjs";
import Carousel, { type ResponsiveType } from "react-multi-carousel";
import { Box, Typography, Grid2 as Grid } from "@mui/material";

import Title from "@/components/Title";
import { EntryDetailsModal } from "@/components/EntryDetails";

import useEntriesByDate, {
  type TUseEntriesByDateResponseItem,
} from "@/hooks/useEntriesByDate";
import useIsResponsive from "@/hooks/useIsResponsive";
import { Breakpoints } from "@/consts";

import styles from "./styles.module.scss";
import petCardImg from "@/assets/images/pet_card_image.png";

const responsive: ResponsiveType = {
  mobile: {
    breakpoint: { min: 0, max: Breakpoints.mobile.max },
    items: 1,
  },
  tablet: {
    breakpoint: { min: Breakpoints.tablet.min, max: Breakpoints.laptop.max },
    items: 2,
  },
  desktop: {
    breakpoint: { min: Breakpoints.desktop.min, max: Breakpoints.desktop.max },
    items: 3,
  },
  desktopXL: {
    breakpoint: {
      min: Breakpoints.desktopXL.min,
      max: Breakpoints.desktopXL.max,
    },
    items: 4,
  },
};

export default function DashboardPage() {
  const { entries } = useEntriesByDate();
  const [entryId, setEntryId] = useState<number>();
  const router = useRouter();
  const isResponsive = useIsResponsive();

  const handleEntryClick = (e: TUseEntriesByDateResponseItem) => {
    if (!isResponsive) {
      setEntryId(e.id_entry);
      return;
    }

    router.push(`/dashboard/reportes/${e.id_entry}`);
  };

  const listFormatter = new Intl.ListFormat("es", {
    style: "long",
    type: "conjunction",
  });
  return (
    <>
      <Title text="Bienvenido Admin" />
      <Typography
        fontFamily="inherit"
        mb={4}
        color="var(--orange)"
        fontSize={25}
        fontWeight="bold"
      >
        Esto tenemos para hoy:
      </Typography>
      <Carousel
        draggable
        responsive={responsive}
        sliderClass={styles.carousel}
        itemClass={styles["carousel-item"]}
      >
        {entries?.map((e) => (
          <Box
            key={e.id_entry}
            bgcolor="#fff"
            py={3}
            px={1}
            borderRadius="15px"
            height="100%"
            onClick={() => handleEntryClick(e)}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              alignItems="center"
            >
              <Typography fontFamily="inherit" fontWeight="bold" fontSize={25}>
                {e.pet.name}
              </Typography>
              <Typography fontFamily="inherit">
                Dueño: {e.pet.owner.names} {e.pet.owner.last_names}
              </Typography>
              <Image
                src={petCardImg}
                alt=""
                className={styles["dog-card-img"]}
              />
            </Box>
            <Grid container rowSpacing={2} mt={3} px={3}>
              <Grid size={4}>Llegada:</Grid>
              <Grid size={8} textAlign="end" fontWeight="bold">
                {dayjs(e.entry_date).format("hh:mm A")}
              </Grid>
              <Grid size={4}>Servicios:</Grid>
              <Grid size={8} textAlign="end" fontWeight="bold">
                {listFormatter.format(e.services.map((s) => s.name))}
              </Grid>
            </Grid>
          </Box>
        ))}
      </Carousel>
      {entryId && (
        <EntryDetailsModal
          open={true}
          id={entryId}
          onClose={() => setEntryId(undefined)}
        />
      )}
    </>
  );
}
