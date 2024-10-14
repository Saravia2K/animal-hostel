"use client";

import {
  Card,
  Avatar,
  Typography,
  CardContent,
  type SxProps,
} from "@mui/material";

import dogImage from "@/assets/images/pet_card_image.png";

export default function PetCard({ name }: PetCardProps) {
  return (
    <Card sx={cardSX}>
      <CardContent>
        <Typography
          variant="h6"
          component="p"
          fontWeight="bold"
          fontFamily="inherit"
        >
          {name}
        </Typography>
      </CardContent>
      <Avatar src={dogImage.src} alt={name} sx={avatarSX} />
    </Card>
  );
}

const cardSX: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 2,
  borderRadius: 2,
  textAlign: "center",
  cursor: "pointer",
  ":hover": {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

const avatarSX: SxProps = {
  width: 80,
  height: 80,
  border: "2px solid var(--grey)",
  marginBottom: 1.5,
};

type PetCardProps = {
  name: string;
};