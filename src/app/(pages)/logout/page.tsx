"use client";

import { Button } from "@mui/material";

const handleLogout = async () => {
  const response = await fetch("/api/logout", {
    method: "POST",
  });

  if (response.ok) {
    // Redirigir al usuario a la página de inicio de sesión después del logout
    window.location.href = "/login";
  } else {
    console.error("Error al cerrar sesión");
  }
};

const LogoutButton = () => {
  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;
