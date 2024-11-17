"use client";

import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingDashboard from "@/components/loadingDashboard/LoadingDashboard";
import LoadingTweetData from "@/components/loadingTweetData/LoadingTweetData";
import SentimentDashboard from "@/components/sentimentDashboard/SentimentDashboard";
import UserProfileCard from "@/components/userProfileCard/UserProfileCard";
import { mockData } from "@/utils/mockData";

const UserProfile = ({ params }: { params: { email: string } }) => {
  let { email } = params;
  email = decodeURIComponent(params.email);
  const [allData, setAllData] = useState<any>(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [updatingDashboard, setUpdatingDashboard] = useState(false);

  const fetchTweets = async (data?: any) => {
    try {
      setUpdatingDashboard(true);
      const response = await axios.post("/api/sentimentAnalysis", {
        data,
      });
      const results = response.data.results;

      setAllData((prevData: any) => ({
        ...prevData,
        results,
      }));

      // Enviar os dados para o banco de dados
      await axios.post("/api/user", {
        email,
        twitterData: allData?.twitterData,
        results,
      });
    } catch (error) {
      console.error("Erro ao buscar tweets ou salvar dados:", error);
    } finally {
      setUpdatingDashboard(false); // Desativa o loading após a atualização
    }
  };

  const fetchUserData = async (origin = "") => {
    try {
      if (email) {
        const response = await axios.get(`/api/user?email=${email}`);

        if (response.data.exists) {
          setAllData(response.data.data);
          // Se os dados existem, carrega-os e verifica se precisa buscar tweets
          if (!response.data.data.results || origin === "twitter") {
            await fetchTweets(response.data.data);
          }
        } else {
          // Cria novo registro apenas se o usuário não existir
          await fetchTweets(response.data.data);
          setAllData(response.data.data);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    } finally {
      setLoadingUserData(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [email]);

  const twitterData = allData?.twitterData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Exibe o loading inicial antes de carregar qualquer dado */}
      {loadingUserData ? (
        <LoadingDashboard />
      ) : (
        <>
          <UserProfileCard
            email={email}
            profilePicUrl={twitterData?.profile_pic_url}
            profileBannerUrl={twitterData?.profile_banner_url}
            name={twitterData?.name}
            username={twitterData?.username}
            numberOfTweets={twitterData?.number_of_tweets}
            location={twitterData?.location}
            description={twitterData?.description}
            setAllData={setAllData}
            fetchUserData={fetchUserData}
          />
          <Divider className="w-full my-8" />
          {/* Overlay de loading enquanto a dashboard está atualizando */}
          {updatingDashboard && <LoadingTweetData />}
          <div className="w-full flex flex-col items-center">
            <SentimentDashboard data={allData} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
