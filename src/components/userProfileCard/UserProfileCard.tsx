// components/UserProfileCard.tsx
import React from "react";
import Image from "next/image";

const UserProfileCard = ({
  profilePicUrl,
  profileBannerUrl,
  name,
  username,
  numberOfTweets,
  location,
  description,
}: {
  profilePicUrl: string;
  profileBannerUrl: string;
  name: string;
  username: string;
  numberOfTweets: number;
  location: string;
  description: string;
}) => {
  return (
    <div className="relative w-[50%] bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
      <div
        className="relative w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${profileBannerUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
        {/* Overlay for darkening the background */}
      </div>
      <div className="relative flex flex-col items-center p-8">
        <div className="relative -mt-16 mb-4">
          <Image
            src={profilePicUrl}
            alt={`${name}'s profile picture`}
            width={48}
            height={48}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <h1 className="text-3xl font-bold text-blue-700">{name}</h1>
        <p className="text-gray-500 text-sm">@{username}</p>
        {location && (
          <p className="text-gray-600 text-sm mt-2">
            <i className="fas fa-map-marker-alt mr-1"></i>
            {location}
          </p>
        )}
        <p className="text-gray-700 text-md mt-4 text-center">{description}</p>
        <p className="text-gray-700 text-lg mt-4">
          Número de Tweets:{" "}
          <span className="font-semibold">{numberOfTweets}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfileCard;
