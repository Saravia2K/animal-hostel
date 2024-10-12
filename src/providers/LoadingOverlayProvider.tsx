"use client";

import { type PropsWithChildren } from "react";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useLoadingOverlay from "@/hooks/useLoadingOverlay";

export default function LoadingOverlayProvider({
  children,
}: PropsWithChildren) {
  const { opened } = useLoadingOverlay();

  return (
    <>
      {children}
      <Backdrop open={opened}>
        <CircularProgress
          sx={{
            color: "var(--orange)",
            fontSize: 25,
          }}
        />
      </Backdrop>
    </>
  );
}
