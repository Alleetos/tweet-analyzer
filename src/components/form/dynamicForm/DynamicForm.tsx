// components/DynamicForm.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import EmailForm from "../emailForm/EmailForm";
import CodeVerificationForm from "../codeVerificationForm/CodeVerificationForm";
import SurveyForm from "../surveyForm/SurveyForm";
import { Box } from "@mui/material";

const DynamicForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const handleEmailSubmit = async (submittedEmail: string) => {
    setEmail(submittedEmail);
    setLoading(true);
    try {
      const response = await fetch("/api/confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: submittedEmail }),
      });

      if (response.ok) {
        setStep(2);
      } else {
        alert("Erro ao enviar código de confirmação.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (code: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/verifyCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, confirmationCode: code }),
      });

      if (response.ok) {
        // Após a verificação do código, verifica se o e-mail já existe na coleção de usuários
        const userCheckResponse = await fetch(`/api/user?email=${email}`);
        console.log("userCheckResponse:", userCheckResponse);

        if (userCheckResponse.ok) {
          const userData = await userCheckResponse.json();
          console.log("userData:", userData);
          if (userData.exists) {
            // Redireciona para a página do usuário, passando os dados do banco no parâmetro `data`
            router.push(`/user/${email}`);
          } else {
            // Se o e-mail não estiver registrado, continua para a próxima etapa do fluxo
            setIsVerified(true);
          }
        } else {
          alert("Erro ao verificar a existência do usuário.");
        }
      } else {
        alert("Código incorreto.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor="white"
        padding={4}
        boxShadow={4}
        borderRadius={3}
      >
        {isVerified ? (
          <SurveyForm email={email} />
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            key={step}
          >
            {step === 1 ? (
              <EmailForm onEmailSubmit={handleEmailSubmit} loading={loading} />
            ) : (
              <CodeVerificationForm
                onCodeSubmit={handleCodeSubmit}
                loading={loading}
              />
            )}
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default DynamicForm;
