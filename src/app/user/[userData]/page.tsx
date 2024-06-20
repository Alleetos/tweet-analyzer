"use client";

import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingDashboard from "@/components/loadingDashboard/LoadingDashboard";
import SentimentDashboard from "@/components/sentimentDashboard/SentimentDashboard";
import UserProfileCard from "@/components/userProfileCard/UserProfileCard";

const UserProfile = () => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  let userData = null;
  if (data) {
    userData = JSON.parse(decodeURIComponent(data));
  }

  const {
    username,
    name,
    profile_pic_url,
    profile_banner_url,
    number_of_tweets,
    location,
    description,
  } = userData;

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <UserProfileCard
        profilePicUrl={profile_pic_url}
        profileBannerUrl={profile_banner_url}
        name={name}
        username={username}
        numberOfTweets={number_of_tweets}
        location={location}
        description={description}
      />
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
