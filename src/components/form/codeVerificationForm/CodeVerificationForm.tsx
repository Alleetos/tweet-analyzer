// components/codeVerificationForm/CodeVerificationForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

interface CodeVerificationFormProps {
  onCodeSubmit: (code: string) => void;
  loading: boolean; // Novo prop para controlar o carregamento
}

const CodeVerificationForm: React.FC<CodeVerificationFormProps> = ({
  onCodeSubmit,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ code: string }>();

  const onSubmit: SubmitHandler<{ code: string }> = ({ code }) => {
    onCodeSubmit(code);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Typography variant="h5" gutterBottom>
        Insira o código de verificação
      </Typography>
      <Typography variant="body2" gutterBottom>
        Enviado ao e-mail
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <TextField
          fullWidth
          label="Código de Verificação"
          variant="outlined"
          {...register("code")}
          error={!!errors.code}
          helperText={errors.code?.message}
          sx={{ maxWidth: "500px", mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ maxWidth: "500px" }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Verificar Código"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default CodeVerificationForm;
