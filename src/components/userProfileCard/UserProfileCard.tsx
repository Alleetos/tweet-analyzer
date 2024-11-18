import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

const UserProfileCard = ({
  email,
  profilePicUrl,
  profileBannerUrl,
  name,
  username,
  numberOfTweets,
  location,
  description,
  setAllData,
  fetchUserData,
}: {
  email?: string;
  profilePicUrl?: string;
  profileBannerUrl?: string;
  name?: string;
  username?: string;
  numberOfTweets?: number;
  location?: string;
  description?: string;
  setAllData: (data: any) => void;
  fetchUserData: (origin?: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [twitterUsername, setTwitterUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(
    profilePicUrl
      ? {
          profilePicUrl,
          profileBannerUrl,
          name,
          username,
          numberOfTweets,
          location,
          description,
        }
      : null
  );

  // Atualiza o estado userData quando os props mudam
  useEffect(() => {
    if (profilePicUrl) {
      setUserData({
        profilePicUrl,
        profileBannerUrl,
        name,
        username,
        numberOfTweets,
        location,
        description,
      });
    }
  }, [
    profilePicUrl,
    profileBannerUrl,
    name,
    username,
    numberOfTweets,
    location,
    description,
  ]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null);
    setTwitterUsername("");
  };

  const handleTwitterUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTwitterUsername(e.target.value);
    setError(null);
  };

  const handleTwitterSubmit = async () => {
    if (!twitterUsername.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/twitterUser?username=${twitterUsername}`
      );
      const data = await response.json();

      if (response.ok) {
        await fetch("/api/twitterUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, twitterData: data }),
        });

        setUserData(data);
        setAllData((prevData: any) => ({ ...prevData, twitterData: data }));
        fetchUserData("twitter");
        handleCloseModal();
      } else {
        setError("Usuário do X não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário do X:", error);
      setError("Erro ao buscar o usuário do X.");
    } finally {
      setLoading(false);
    }
  };

  if (email === process.env.NEXT_PUBLIC_ADM_EMAIL) {
    // Renderização especial para a conta admin
    return (
      <div className="flex justify-center items-center w-full h-full p-10">
        <div className="w-[50%] bg-white rounded-lg shadow-lg p-8 animate-fade-in">
          <div className="text-center">
            <Typography
              variant="h4"
              className="text-blue-700 font-extrabold mb-4"
            >
              Área do Administrador
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-700 text-lg leading-relaxed mb-6"
            >
              Você está monitorando as análises em tempo real de todos os
              usuários na dashboard.
            </Typography>
            <div className="mt-4 border-t border-gray-300"></div>
            <Typography
              variant="body2"
              className="text-gray-500 italic text-sm mt-6"
            >
              Dados atualizados em tempo real.
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      {userData ? (
        <div className="relative w-[50%] bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <div
            className="relative w-full h-48 bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                userData?.profileBannerUrl || "/placeholder-banner.jpg"
              })`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
          <div className="relative flex flex-col items-center p-8">
            <div className="relative -mt-16 mb-4">
              {userData?.profilePicUrl ? (
                <Image
                  key={userData.profilePicUrl} // Força re-renderização ao alterar URL
                  src={userData.profilePicUrl}
                  alt={`${userData?.name || "Usuário"}'s profile picture`}
                  width={48}
                  height={48}
                  className="rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-blue-700">
              {userData.name}
            </h1>
            <p className="text-gray-500 text-sm">@{userData.username}</p>
            {userData.location && (
              <p className="text-gray-600 text-sm mt-2">
                <i className="fas fa-map-marker-alt mr-1"></i>
                {userData.location}
              </p>
            )}
            <p className="w-[80%] text-gray-700 text-md mt-4 text-center break-words">
              {userData.description}
            </p>
            <p className="text-gray-700 text-lg mt-4">
              Número de Tweets:{" "}
              <span className="font-semibold">{userData.numberOfTweets}</span>
            </p>
          </div>
        </div>
      ) : (
        <div
          className="w-[50%] rounded-lg p-8 shadow-lg text-center animate-fade-in"
          style={{
            background: `linear-gradient(135deg, #3B3838, #2C2A2A)`,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Melhore sua análise de sentimentos com o X!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              mb: 4,
              fontSize: "1.1rem",
            }}
          >
            Adicione sua conta do X e obtenha insights detalhados sobre seus
            sentimentos e interações online.
          </Typography>
          <Button
            variant="contained"
            endIcon={
              <Image
                src="/twitter-logo.png" // Caminho da imagem na pasta public
                alt="X logo"
                width={20}
                height={20}
              />
            }
            sx={{
              backgroundColor: "#000000",
              color: "white",
              fontWeight: "bold",
              ":hover": { backgroundColor: "#333333" },
              padding: "12px 24px",
              fontSize: "1rem",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              border: "1px solid white",
            }}
            onClick={handleOpenModal}
          >
            Adicionar Conta do
          </Button>
        </div>
      )}

      {/* Modal para inserir nome de usuário do X */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bgcolor="white"
          padding={4}
          borderRadius={2}
          boxShadow={24}
          maxWidth={400}
          mx="auto"
          mt={8}
        >
          <Typography variant="h6" gutterBottom>
            Insira seu nome de usuário do X
          </Typography>
          <TextField
            fullWidth
            label="Nome de Usuário do X"
            variant="outlined"
            value={twitterUsername}
            onChange={handleTwitterUsernameChange}
            helperText={error || "Exemplo: nome_de_usuario"}
            error={Boolean(error)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleTwitterSubmit}
            disabled={loading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Verificar"
            )}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserProfileCard;
