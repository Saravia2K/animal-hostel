"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@mui/material";

import styles from "./styles.module.scss";
import logo from "@/assets/images/logo.png";
import logout from "@/assets/images/logout.png";

export default function Sidebar({ items, onLogoutClick }: TProps) {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles["logo-container"]}>
        <Link href="/dashboard">
          <Image src={logo} alt="Animal Hostel logo" />
        </Link>
      </div>
      <ul className={styles.links}>
        {items.map(({ name, path, icon, badge }, i) => {
          const href = `/dashboard/${path}`;
          const samePage = href == pathname;

          return (
            <li key={i} title={name} className={styles["link-item"]}>
              <Link href={href} onClick={(e) => samePage && e.preventDefault()}>
                <Badge badgeContent={badge} color="secondary">
                  <Image src={icon} alt={name} />
                </Badge>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={styles["logout-container"]}>
        <Image src={logout} alt="Logout icon" onClick={onLogoutClick} />
      </div>
    </nav>
  );
}

type TProps = {
  items: {
    name: string;
    path: string;
    icon: StaticImageData;
    badge?: number;
  }[];
  onLogoutClick: () => void;
};
