"use client";

import { useEffect, useState } from "react";
import { Button, Grid2 as Grid } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import type { TPet } from "@/types";

import Title from "@/components/Title";
import SearchInput from "@/components/SearchInput";
import PetCard from "@/components/PetCard";

import usePets from "@/hooks/usePets";
import useLoadingOverlay from "@/hooks/useLoadingOverlay";

export default function MascotasPage() {
  const { setOpenState } = useLoadingOverlay();
  const { pets, petsLoading } = usePets();
  const [currentPets, setCurrentPets] = useState<TPet[]>([]);
  const router = useRouter();

  useEffect(() => {
    setOpenState(petsLoading);
    if (!petsLoading && pets) setCurrentPets(pets);
  }, [petsLoading, setOpenState, pets]);

  const handleSearch = (text: string) => {
    if (petsLoading || !pets) return;

    setCurrentPets(
      text == "" ? pets : pets.filter((p) => p.name.includes(text))
    );
  };

  return (
    <>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid
          size={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Title text="Mascotas" mb={0} />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--darkGreen)",
              height: "fit-content",
            }}
            onClick={() => router.push("/dashboard/mascotas/agregar")}
          >
            Añadir mascota
          </Button>
        </Grid>
        <Grid size={8}>
          <SearchInput onChange={handleSearch} name="mascotas_search" />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={5}>
        {currentPets.map((p, i) => (
          <Grid key={i} size={3}>
            <PetCard
              name={p.name}
              onClick={() => router.push(`/dashboard/mascotas/${p.id_pet}`)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
