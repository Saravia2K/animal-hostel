"use client";

import Image from "next/image";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";
import image from "./images/inicio.png";

const Welcome = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={image} alt="Logo" width={200} height={200} />
      </div>
      <h1 className={styles.title}>Bienvenido</h1>
      <Button
        variant="contained"
        color="success"
        endIcon={<ArrowForwardIcon />}
        className={styles.button}
        onClick={() => router.push("/login")}
      >
        Empezar
      </Button>
    </div>
  );
};

export default Welcome;
