"use client";

import { useRouter } from "next-nprogress-bar";
import {
  Box,
  List,
  Badge,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import Image, { type StaticImageData } from "next/image";

import logo from "@/assets/images/logo.png";
import logout from "@/assets/images/logout.png";

export default function ResponsiveSidebar({
  items,
  open,
  onLogoutClick,
  onClose,
}: TProps) {
  const router = useRouter();

  const handleListItemClick = (href: string) => {
    router.push(href);
    if (onClose) onClose();
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <ListItemIcon onClick={() => handleListItemClick("/dashboard")}>
            <Image src={logo} alt="Animal Hostel logo" width={100} />
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />
      <List>
        {items.map(({ name, path, icon, badge }, i) => {
          const href = `/dashboard/${path}`;

          return (
            <ListItem
              key={i}
              disablePadding
              onClick={() => handleListItemClick(href)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Badge badgeContent={badge} color="secondary">
                    <Image src={icon} alt={name} width={25} />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemIcon onClick={onLogoutClick}>
            <Image src={logout} alt="Logout icon" width={50} />
          </ListItemIcon>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
}

type TProps = {
  open?: boolean;
  items: {
    name: string;
    path: string;
    icon: StaticImageData;
    badge?: number;
  }[];
  onLogoutClick: () => void;
  onClose?: () => void;
};
