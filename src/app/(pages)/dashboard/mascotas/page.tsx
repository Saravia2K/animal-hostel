"use client";

import { useEffect, useState } from "react";
import { Button, Grid2 as Grid } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import type { TPet } from "@/types";

import Title from "@/components/Title";
import SearchInput from "@/components/SearchInput";
import PetCard from "@/components/PetCard";

import usePets from "@/hooks/usePets";

export default function MascotasPage() {
  const { pets, petsLoading } = usePets();
  const [currentPets, setCurrentPets] = useState<TPet[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!petsLoading && pets) setCurrentPets(pets);
  }, [petsLoading, pets]);

  const handleSearch = (text: string) => {
    if (petsLoading || !pets) return;

    const currentPets =
      text == ""
        ? pets
        : pets.filter((p) =>
            [p.name, p.owner.names, p.owner.last_names]
              .join(" ")
              .toLowerCase()
              .includes(text.toLowerCase())
          );
    setCurrentPets(currentPets);
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
              owner_name={`${p.owner.names} ${p.owner.last_names}`}
              onClick={() => router.push(`/dashboard/mascotas/${p.id_pet}`)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
