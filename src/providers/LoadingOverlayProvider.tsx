"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useLoadingOverlay from "@/hooks/useLoadingOverlay";

export default function LoadingOverlayProvider({
  children,
}: PropsWithChildren) {
  const qc = useQueryClient();
  const { opened, show, close } = useLoadingOverlay();

  useEffect(() => {
    return qc.getQueryCache().subscribe(() => {
      const somethingIsFetching = !!qc.isFetching();

      if (!opened && somethingIsFetching) show();
      if (opened && !somethingIsFetching) close();
    });
  }, [qc, show, close, opened]);

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
