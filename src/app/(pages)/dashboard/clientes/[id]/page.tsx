"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { Button, Grid2 as Grid, Typography } from "@mui/material";

import Title from "@/components/Title";

import useOwner from "@/hooks/useOwner";

import mascotaIcon from "@/assets/images/mascota_icon.png";
import Image from "next/image";
import CardInformation from "@/components/CardInformation";

export default function ClienteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { owner, ownerLoading } = useOwner(+id);
  const router = useRouter();

  if (!owner || ownerLoading) return;
  return (
    <>
      <Grid
        container
        spacing={4}
        p={8}
        borderRadius={4}
        sx={{ backgroundColor: "#fff" }}
      >
        <Grid
          size={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Title text={`${owner?.names} ${owner?.last_names}`} mb={0} />
          <Button
            variant="contained"
            sx={{ backgroundColor: "var(--orange)" }}
            onClick={() =>
              router.push(`/dashboard/clientes/${owner.id_owner}/editar`)
            }
          >
            Editar cliente
          </Button>
        </Grid>

        <Grid size={5}>
          <CardInformation header="Dirección:" text={owner.home} />
        </Grid>

        <Grid size={5}>
          <CardInformation header="TEL:" text={owner.cellphone} />
        </Grid>

        <Grid size={5}>
          <CardInformation header="Email:" text={owner.email} />
        </Grid>

        <Grid size={5}>
          <CardInformation header="Facebook:" text={owner?.facebook || "-"} />
        </Grid>
      </Grid>

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
        {owner?.pets.map((p) => (
          <Grid
            key={p.id_pet}
            size={3}
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
    </>
  );
}
