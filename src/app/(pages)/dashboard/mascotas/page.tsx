"use client";

import { useEffect, useState } from "react";
import { Grid2 as Grid } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import type { TPet } from "@/types";

import SearchInput from "@/components/SearchInput";
import PetCard from "@/components/PetCard";
import TitleWithButton from "@/components/TitleWithButton";

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
        <TitleWithButton
          grid
          title="Mascotas"
          buttonText="Añadir mascota"
          onClick={() => router.push("/dashboard/mascotas/agregar")}
        />
        <Grid size={{ xs: 12, md: 8 }}>
          <SearchInput
            onChange={handleSearch}
            name="mascotas_search"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={5}>
        {currentPets.map((p, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
