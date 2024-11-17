// app/page.tsx
"use client";
import React from "react";
import DynamicForm from "@/components/form/dynamicForm/DynamicForm";

const Main = () => {
  return (
    <div className="flex-grow flex items-center justify-center">
      <DynamicForm />
    </div>
  );
};

export default Main;
