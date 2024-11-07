"use client";

import { type PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { Badge, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import useEntriesByDate from "@/hooks/useEntriesByDate";

import styles from "./styles.module.scss";
import logo from "@/assets/images/logo.png";
import logout from "@/assets/images/logout.png";
import huellaIcon from "@/assets/images/huella_icon.png";
import clientesIcon from "@/assets/images/clientes_icon.png";
import encargadoIcon from "@/assets/images/encargado_icon.png";
import reportesIcon from "@/assets/images/reportes_icon.png";
import recordatoriosIcon from "@/assets/images/recordatorios_icon.png";
import serviciosIcon from "@/assets/images/servicios_icon.png";
import preguntasIcon from "@/assets/images/preguntas_icon.png";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { entries } = useEntriesByDate();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

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
    <div className={styles["dashboard-layout"]}>
      <nav className={styles.nav}>
        <div className={styles["logo-container"]}>
          <Link href="/dashboard">
            <Image src={logo} alt="Animal Hostel logo" />
          </Link>
        </div>
        <ul className={styles.links}>
          {NAV_ITEMS.map(({ name, path, icon, badge }, i) => {
            const href = `/dashboard/${path}`;
            const samePage = href == pathname;

            return (
              <li key={i} title={name} className={styles["link-item"]}>
                <Link
                  href={href}
                  onClick={(e) => samePage && e.preventDefault()}
                >
                  <Badge badgeContent={badge} color="secondary">
                    <Image src={icon} alt={name} />
                  </Badge>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles["logout-container"]}>
          <Image src={logout} alt="Logout icon" onClick={handleLogout} />
        </div>
      </nav>
      <main className={styles.main}>
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
