"use client";

import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingOverlay from "../loadingOverlay/LoadingOverlay";

const data = {
  creation_date: "Tue Jun 02 20:12:29 +0000 2009",
  user_id: "44196397",
  username: "elonmusk",
  name: "Elon Musk",
  follower_count: 187420850,
  following_count: 631,
  favourites_count: 55708,
  is_private: null,
  is_verified: false,
  is_blue_verified: true,
  location: "",
  profile_pic_url:
    "https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_normal.jpg",
  profile_banner_url:
    "https://pbs.twimg.com/profile_banners/44196397/1690621312",
  description: "",
  external_url: null,
  number_of_tweets: 45773,
  bot: false,
  timestamp: 1243973549,
  has_nft_avatar: false,
  category: null,
  default_profile: false,
  default_profile_image: false,
  listed_count: 150541,
  verified_type: null,
};

const MainForm = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSearch = async () => {
    setError("");
    setLoading(true);
    // const encodedUserData = encodeURIComponent(JSON.stringify(data));
    // router.push(`/user/${username}?data=${encodedUserData}`);

    try {
      const response = await axios.get(`/api/twitterUser`, {
        params: { username },
      });

      if (response.data && response.data.username) {
        const userData = response.data;
        // Encode the user data into a query parameter
        const encodedUserData = encodeURIComponent(JSON.stringify(userData));

        // Navegar para a página de perfil do usuário com os dados passados na URL
        router.push(`/user/${username}?data=${encodedUserData}`);
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
    <div className="flex flex-1 items-center justify-center">
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
