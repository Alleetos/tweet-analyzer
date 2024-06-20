"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingDashboard from "@/components/loadingDashboard/LoadingDashboard";
import SentimentDashboard from "@/components/sentimentDashboard/SentimentDashboard";

const UserProfile = () => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  let userData = null;
  if (data) {
    userData = JSON.parse(decodeURIComponent(data));
  }
  const { username, name, profile_pic_url, number_of_tweets } = userData;

  // Efeito para buscar os tweets e a análise de sentimentos
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.post("/api/sentimentAnalysis", {
          username,
        });
        setTweets(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar tweets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [username]);

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p>Erro: Nenhum dado encontrado para o usuário.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md h-1/2 animate-fade-in">
        <div className="flex justify-center mb-4">
          <Image
            src={profile_pic_url}
            alt={`${name}'s profile picture`}
            width={48}
            height={48}
            className="rounded-full border-2 border-blue-500"
          />
        </div>
        <h1 className="text-3xl font-bold mt-4 text-blue-700">{name}</h1>
        <p className="text-gray-500 text-sm">@{username}</p>
        <p className="text-gray-700 text-lg mt-4">
          Número de Tweets:{" "}
          <span className="font-semibold">{number_of_tweets}</span>
        </p>
      </div>
      <Divider className="w-full my-8" />

      <div className="w-full flex flex-col items-center">
        {loading ? (
          <LoadingDashboard />
        ) : (
          <SentimentDashboard tweets={tweets} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
