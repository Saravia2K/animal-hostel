"use client";

import useIsResponsive from "@/hooks/useIsResponsive";
import { Box, Button, Grid2 as Grid } from "@mui/material";
import Title from "../Title";

export default function TitleWithButton({
  grid,
  title,
  buttonText,
  onClick,
  btnColor = "lightGreen",
}: TProps) {
  const isResponsive = useIsResponsive({ excludeTablets: true });

  const Component = grid ? Grid : Box;

  return (
    <Component
      size={grid ? 12 : undefined}
      display="flex"
      justifyContent={isResponsive ? "initial" : "space-between"}
      alignItems={isResponsive ? "initial" : "center"}
      flexDirection={isResponsive ? "column" : "row"}
      gap={isResponsive ? 2 : 0}
    >
      <Title text={title} mb={0} />
      <Button
        variant="contained"
        sx={{ backgroundColor: `var(--${btnColor})` }}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </Component>
  );
}

type TProps = {
  grid?: boolean;
  title: string;
  buttonText: string;
  onClick?: () => void;
  btnColor?: "lightGreen" | "orange";
};
