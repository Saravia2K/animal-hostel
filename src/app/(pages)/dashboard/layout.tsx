"use client";

import { useState, type PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import classNames from "classnames";
import { Badge, Fab, IconButton, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

import Sidebar from "./Sidebar";
import ResponsiveSidebar from "./ResponsiveSidebar";

import useEntriesByDate from "@/hooks/useEntriesByDate";

import styles from "./styles.module.scss";
import huellaIcon from "@/assets/images/huella_icon.png";
import clientesIcon from "@/assets/images/clientes_icon.png";
import encargadoIcon from "@/assets/images/encargado_icon.png";
import reportesIcon from "@/assets/images/reportes_icon.png";
import recordatoriosIcon from "@/assets/images/recordatorios_icon.png";
import serviciosIcon from "@/assets/images/servicios_icon.png";
import preguntasIcon from "@/assets/images/preguntas_icon.png";
import useLoadingOverlay from "@/hooks/useLoadingOverlay";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [openResponsiveSidebar, setOpenResponsiveSidebar] = useState(false);
  const { entries } = useEntriesByDate();
  const router = useRouter();
  const pathname = usePathname();
  const MUITheme = useTheme();
  const loader = useLoadingOverlay();
  const isResponsiveSidebar = useMediaQuery(MUITheme.breakpoints.down("md"));

  const handleLogout = async () => {
    loader.show();
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    loader.close();
    if (response.ok) {
      window.location.href = "/login";
    } else {
      console.error("Error al cerrar sesión");
    }
  };

  if (!entries) return;
  const NAV_ITEMS = [
    { name: "Mascotas", path: "mascotas", icon: huellaIcon },
    { name: "Clientes", path: "clientes", icon: clientesIcon },
    { name: "Encargados", path: "encargados", icon: encargadoIcon },
    { name: "Reportes", path: "reportes", icon: reportesIcon },
    {
      name: "Recordatorios",
      path: "recordatorios",
      icon: recordatoriosIcon,
      badge: entries.filter((e) => !e.notification_seen).length,
    },
    { name: "Servicios", path: "servicios", icon: serviciosIcon },
    { name: "Preguntas", path: "preguntas", icon: preguntasIcon },
  ];
  const isInFichaDeIngreso = pathname == "/dashboard/ficha-de-ingreso";
  return (
    <div
      className={classNames({
        [styles["dashboard-layout"]]: true,
        [styles.responsive]: isResponsiveSidebar,
      })}
    >
      {isResponsiveSidebar ? (
        <ResponsiveSidebar
          open={openResponsiveSidebar}
          items={NAV_ITEMS}
          onLogoutClick={handleLogout}
          onClose={() => setOpenResponsiveSidebar(false)}
        />
      ) : (
        <Sidebar items={NAV_ITEMS} onLogoutClick={handleLogout} />
      )}
      <main className={styles.main}>
        {isResponsiveSidebar && (
          <Badge badgeContent={NAV_ITEMS[4].badge || 0} color="secondary">
            <IconButton onClick={() => setOpenResponsiveSidebar(true)}>
              <MenuIcon sx={{ color: "var(--orange)", fontSize: "40px" }} />
            </IconButton>
          </Badge>
        )}
        {children}
        {!isInFichaDeIngreso && (
          <Fab
            color="secondary"
            aria-label="Añadir entrada"
            sx={{
              position: "absolute",
              bottom: 25,
              right: 25,
              backgroundColor: "var(--orange)",
              "&:hover": {
                backgroundColor: "var(--lightGreen)",
              },
            }}
            onClick={() => router.push("/dashboard/ficha-de-ingreso")}
          >
            <AddIcon />
          </Fab>
        )}
      </main>
    </div>
  );
}
