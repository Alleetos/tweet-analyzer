"use client";

import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import LoadingOverlay from "../loadingOverlay/LoadingOverlay";

const MainForm = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.get(`/api/twitterUser`, {
        params: { username },
      });
      if (response.data && response.data.username) {
        alert(`Usuário ${username} encontrado!`);
      } else {
        setError("Usuário não encontrado.");
      }
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      setError("Ocorreu um erro ao buscar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100">
      <Box className="bg-white p-8 rounded shadow-md text-center max-w-md w-full">
        <Typography variant="h4" className="mb-4 text-primary">
          Digite seu username do Twitter
        </Typography>
        <TextField
          variant="outlined"
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          className="mt-4 w-full"
          disabled={!username || loading}
        >
          Buscar Dados
        </Button>
        {loading && <LoadingOverlay username={username} />}
      </Box>
    </div>
  );
};

export default MainForm;
