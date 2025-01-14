import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useLoginMutation } from "../../../app/api/companySlice";
import { useAppDispatch } from "../../../app/hook/reduxHooks";
import { setUserInfo } from "../../../app/features/userSlice";

const Auth = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Очистка ошибок
    setLoading(true);

    try {
      const response = await login({
        data: { username, password },
      }).unwrap(); // Разворачиваем ответ

      console.log("Login successful:", response);
      dispatch(setUserInfo(response));
      alert("Вы успешно вошли!");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err?.data?.message || "Не удалось войти. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}>
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}>
        <Typography variant="h5" gutterBottom>
          Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Имя пользователя"
            type="text"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ margin: "0.5rem 0" }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ margin: "1rem 0" }}
            disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Войти"}
          </Button>
        </form>
        <Typography variant="body2">
          Нет аккаунта? <a href="#register">Зарегистрируйтесь</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Auth;
