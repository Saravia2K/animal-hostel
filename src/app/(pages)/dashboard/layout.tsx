"use client";

import { type PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./styles.module.scss";
import logo from "@/assets/images/logo.png";
import logout from "@/assets/images/logout.png";
import entrenamientoIcon from "@/assets/images/entrenamiento_icon.png";
import daycareIcon from "@/assets/images/daycare_icon.png";

export default function DashboardLayout({ children }: PropsWithChildren) {
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

  return (
    <div className={styles["dashboard-layout"]}>
      <nav className={styles.nav}>
        <div className={styles["logo-container"]}>
          <Link href="/dashboard">
            <Image src={logo} alt="Animal Hostel logo" />
          </Link>
        </div>
        <ul className={styles.links}>
          {NAV_ITEMS.map(({ name, path, icon }, i) => {
            const href = `/dashboard/${path}`;
            const samePage = href == pathname;

            return (
              <li key={i} title={name} className={styles["link-item"]}>
                <Link
                  href={href}
                  onClick={(e) => samePage && e.preventDefault()}
                >
                  <Image src={icon} alt={name} />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles["logout-container"]}>
          <Image src={logout} alt="Logout icon" onClick={handleLogout} />
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

const NAV_ITEMS = [
  { name: "Entrenamiento", path: "entrenamiento", icon: entrenamientoIcon },
  { name: "Daycare", path: "daycare", icon: daycareIcon },
];
