"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next-nprogress-bar";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

import styles from "./styles.module.scss";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message);
      }
    } catch (error) {
      console.log(error);
      setLoginError("Error de servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className={styles.container}>
      <Paper elevation={3} className={styles.formContainer}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          className={styles.title}
        >
          Bienvenido
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Usuario"
            variant="outlined"
            margin="normal"
            {...register("email", { required: "El usuario es requerido" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          {loginError && (
            <Typography color="error" align="center">
              {loginError}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="success"
            type="submit"
            className={styles.submitButton}
            disabled={isLoading} // Deshabilitar el botón cuando está cargando
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
