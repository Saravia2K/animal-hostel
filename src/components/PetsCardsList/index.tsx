"use client";

import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { Grid2 as Grid, Typography } from "@mui/material";

import type { TPet } from "@/types";

import mascotaIcon from "@/assets/images/mascota_icon.png";

export default function PetsCardsList({ pets }: TProps) {
  const router = useRouter();

  return (
    <Grid container rowSpacing={3} columnSpacing={6} mt={5}>
      <Grid
        size={12}
        fontWeight="bold"
        pl={3}
        pb={1}
        borderBottom="1px solid grey"
      >
        Mascotas
      </Grid>
      {pets.map((p) => (
        <Grid
          key={p.id_pet}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          borderRadius={3}
          p={2}
          display="grid"
          gridTemplateColumns="25% 1fr"
          gap={3}
          alignItems="center"
          sx={{ backgroundColor: "#7fc243", cursor: "pointer" }}
          onClick={() => router.push(`/dashboard/mascotas/${p.id_pet}`)}
        >
          <Image src={mascotaIcon} alt="" />
          <Typography
            fontFamily="inherit"
            fontSize={20}
            fontWeight="bold"
            color="#fff"
          >
            {p.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

type TProps = {
  pets: TPet[];
};
