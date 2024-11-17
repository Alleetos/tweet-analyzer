// components/LoadingDashboard.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

const LoadingTweetData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Typography variant="h5" className="text-blue-600 mb-2">
        Estamos completando sua análise com o X ...
      </Typography>
      <Box className="flex space-x-2 mt-4">
        {/* Simulação de construção da dashboard */}
        <div className="w-16 h-16 bg-blue-200 animate-pulse rounded-md"></div>
        <div className="w-16 h-16 bg-blue-300 animate-pulse rounded-md"></div>
        <div className="w-16 h-16 bg-blue-400 animate-pulse rounded-md"></div>
      </Box>
    </div>
  );
};

export default LoadingTweetData;
