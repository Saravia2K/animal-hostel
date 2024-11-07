"use client";

import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { Box, Typography, Grid2 as Grid } from "@mui/material";
import Carousel from "react-multi-carousel";

import Title from "@/components/Title";
import EntryDetailsModal from "@/components/EntryDetailsModal";

import useEntriesByDate from "@/hooks/useEntriesByDate";

import styles from "./styles.module.scss";
import petCardImg from "@/assets/images/pet_card_image.png";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function DashboardPage() {
  const { entries } = useEntriesByDate();
  const [entryId, setEntryId] = useState<number>();

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
          <Box key={e.id_entry} onClick={() => setEntryId(e.id_entry)}>
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
              <Grid size={6}>Llegada:</Grid>
              <Grid size={6} textAlign="end" fontWeight="bold">
                {dayjs(e.entry_date).format("hh:mm A")}
              </Grid>
              <Grid size={6}>Servicios:</Grid>
              <Grid size={6} textAlign="end" fontWeight="bold">
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
