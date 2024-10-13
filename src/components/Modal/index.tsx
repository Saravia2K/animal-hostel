"use client";

import { Box, type ModalProps, Modal as MUIModal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  maxWidth: "75%",
  bgcolor: "#fff",
  boxShadow: 24,
  p: 7,
  borderRadius: 3,
};

export default function Modal(props: ModalProps) {
  return (
    <MUIModal {...props}>
      <Box sx={style}>{props.children}</Box>
    </MUIModal>
  );
}
