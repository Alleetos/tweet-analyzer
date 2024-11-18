// components/SurveyForm.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { questions as steps } from "../../../utils/questions";
import LoadingOverlay from "@/components/loadingOverlay/LoadingOverlay";

interface SurveyFormProps {
  email: string;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ email }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>(
    steps.reduce((acc, step) => {
      acc[step.step] = Array(step.questions.length).fill("");
      return acc;
    }, {} as Record<string, string[]>)
  );
  const [twitterUsername, setTwitterUsername] = useState<string>("");
  const [twitterData, setTwitterData] = useState<any>(null);
  const [loadingTwitter, setLoadingTwitter] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [twitterError, setTwitterError] = useState<string | null>(null);
  const [loadingRedirect, setLoadingRedirect] = useState(false); // Estado para o overlay de loading

  const handleChangeAnswer = (
    step: string,
    questionIndex: number,
    answer: string
  ) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      updatedAnswers[step][questionIndex] = answer;
      return updatedAnswers;
    });
  };

  const handleNextStep = () => {
    if (
      currentStep < steps.length &&
      answers[steps[currentStep].step].some((answer) => !answer.trim())
    ) {
      setAlertOpen(true);
      return;
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    if (currentStep > 0) setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleCloseAlert = () => setAlertOpen(false);

  const handleTwitterUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTwitterUsername(e.target.value);
    setTwitterError(null);
  };

  const handleSubmit = async () => {
    let fetchedTwitterData = null;

    if (twitterUsername.trim()) {
      // Verifica o nome de usuário do Twitter apenas se o usuário preencheu o campo
      setLoadingTwitter(true);
      try {
        const response = await fetch(
          `/api/twitterUser?username=${twitterUsername}`
        );
        const data = await response.json();

        if (response.ok) {
          setTwitterData(data);
          fetchedTwitterData = data;
          setTwitterError(null);
        } else {
          setTwitterData(null);
          setTwitterError("Usuário do X não encontrado.");
          setLoadingTwitter(false);
          return;
        }
      } catch (error) {
        console.error("Erro ao verificar nome de usuário do X:", error);
        setTwitterError("Erro ao verificar usuário do X.");
        setLoadingTwitter(false);
        return;
      }
      setLoadingTwitter(false);
    }

    // Exibir o overlay de loading antes de redirecionar
    setLoadingRedirect(true);

    const result = {
      email,
      answers,
      twitterData: fetchedTwitterData
        ? { username: fetchedTwitterData.username, ...fetchedTwitterData }
        : null,
      results: null,
    };

    try {
      const saveResponse = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      if (!saveResponse.ok) {
        console.error("Erro ao salvar dados no banco de dados");
        setLoadingRedirect(false);
        return;
      }
    } catch (error) {
      console.error("Erro ao salvar dados no banco:", error);
      setLoadingRedirect(false);
      return;
    }

    // Redirecionar apenas com o e-mail
    setTimeout(() => {
      router.push(`/user/${email}`);
    }, 1500);
  };

  return (
    <Box width={"1000px"}>
      <Typography variant="h5" align="center" gutterBottom>
        {steps[currentStep]?.step || "Nome de Usuário do X"}
      </Typography>

      {/* Overlay de Loading para Redirecionamento */}
      {loadingRedirect && <LoadingOverlay message={`Processando dados...`} />}

      {/* Stepper para mostrar progresso */}
      <Stepper
        activeStep={currentStep}
        alternativeLabel
        sx={{ width: "100%", mb: 4 }}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.step}</StepLabel>
          </Step>
        ))}
        <Step>
          <StepLabel>X</StepLabel>
        </Step>
      </Stepper>

      {/* Conteúdo das etapas de perguntas ou do campo opcional do Twitter */}
      {currentStep < steps.length ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          key={currentStep}
          style={{ width: "100%" }}
        >
          <Box component="form">
            {steps[currentStep].step === "Liderança" && (
              <Box mb={3} textAlign="center">
                <Typography variant="body1" gutterBottom>
                  Assista ao vídeo abaixo para responder às perguntas
                  relacionadas à liderança.
                </Typography>
                <Box
                  component="iframe"
                  width="80%"
                  height="250px"
                  src="https://www.youtube.com/embed/P5U4r0Op59c?si=JBm5uBCp6q8jjjom"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  sx={{
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Box>
            )}
            {steps[currentStep].questions.map((question, index) => (
              <Box key={index} mb={3}>
                <Typography variant="body1" gutterBottom>
                  {question}
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  minRows={2}
                  value={answers[steps[currentStep].step][index]}
                  onChange={(e) =>
                    handleChangeAnswer(
                      steps[currentStep].step,
                      index,
                      e.target.value
                    )
                  }
                />
              </Box>
            ))}
          </Box>
        </motion.div>
      ) : (
        <Box width="100%">
          <Typography variant="body1" gutterBottom>
            Forneça o nome de usuário da sua conta do X para que possamos
            coletar seus tweets e fazer uma análise mais detalhada.
          </Typography>
          <TextField
            fullWidth
            label="Nome de Usuário do X (opcional)"
            variant="outlined"
            value={twitterUsername}
            onChange={handleTwitterUsernameChange}
            error={Boolean(twitterError)}
            helperText={twitterError || "Exemplo: nome_de_usuario"}
            InputProps={{
              endAdornment: loadingTwitter && <CircularProgress size={20} />,
            }}
          />
        </Box>
      )}

      {/* Botões para navegação */}
      <Box display="flex" justifyContent="space-between" width="100%" mt={3}>
        <Button
          variant="outlined"
          onClick={handleBackStep}
          disabled={currentStep === 0}
        >
          Voltar
        </Button>
        {currentStep < steps.length ? (
          <Button variant="contained" color="primary" onClick={handleNextStep}>
            Próximo
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loadingTwitter}
          >
            {loadingTwitter ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Finalizar"
            )}
          </Button>
        )}
      </Box>

      {/* Alerta para perguntas não respondidas */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Por favor, responda todas as perguntas antes de prosseguir.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SurveyForm;
