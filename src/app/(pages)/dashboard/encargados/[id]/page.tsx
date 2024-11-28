"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { Grid2 as Grid } from "@mui/material";

import CardInformation from "@/components/CardInformation";
import TitleWithButton from "@/components/TitleWithButton";
import PetsCardsList from "@/components/PetsCardsList";

import useVeterinarian from "@/hooks/useVeterinarian";
import useIsResponsive from "@/hooks/useIsResponsive";

export default function ClienteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { veterinarian, veterinarianLoading } = useVeterinarian(+id);
  const router = useRouter();
  const isResponsive = useIsResponsive({ excludeTablets: true });

  if (!veterinarian || veterinarianLoading) return;
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
          title={`${veterinarian?.names} ${veterinarian?.last_names}`}
          buttonText="Editar encargado"
          onClick={() =>
            router.push(
              `/dashboard/encargados/${veterinarian.id_veterinarian}/editar`
            )
          }
          btnColor="orange"
        />

        <Grid size={5}>
          <CardInformation header="Nombre(s):" text={veterinarian.names} />
        </Grid>

        <Grid size={5}>
          <CardInformation header="TEL:" text={veterinarian.cellphone} />
        </Grid>

        <Grid size={5}>
          <CardInformation
            header="Apellido(s):"
            text={veterinarian.last_names}
          />
        </Grid>
      </Grid>

      <PetsCardsList pets={veterinarian.pets} />
    </>
  );
}
