"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { Grid2 as Grid } from "@mui/material";

import CardInformation from "@/components/CardInformation";
import TitleWithButton from "@/components/TitleWithButton";
import PetsCardsList from "@/components/PetsCardsList";

import useOwner from "@/hooks/useOwner";
import useIsResponsive from "@/hooks/useIsResponsive";

export default function ClienteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { owner, ownerLoading } = useOwner(+id);
  const router = useRouter();
  const isResponsive = useIsResponsive({ excludeTablets: true });

  if (!owner || ownerLoading) return;
  return (
    <>
      <Grid
        container
        spacing={4}
        p={isResponsive ? 4 : 8}
        borderRadius={4}
        sx={{ backgroundColor: "#fff" }}
      >
        <TitleWithButton
          grid
          title={`${owner?.names} ${owner?.last_names}`}
          buttonText="Editar cliente"
          btnColor="orange"
          onClick={() =>
            router.push(`/dashboard/clientes/${owner.id_owner}/editar`)
          }
        />

        <Grid size={{ xs: 12, sm: 5 }}>
          <CardInformation header="Dirección:" text={owner.home} />
        </Grid>

        <Grid size={{ xs: 12, sm: 5 }}>
          <CardInformation header="TEL:" text={owner.cellphone} />
        </Grid>

        <Grid size={{ xs: 12, sm: 5 }}>
          <CardInformation header="Email:" text={owner.email} />
        </Grid>

        <Grid size={{ xs: 12, sm: 5 }}>
          <CardInformation header="Facebook:" text={owner?.facebook || "-"} />
        </Grid>
      </Grid>

      <PetsCardsList pets={owner.pets} />
    </>
  );
}
