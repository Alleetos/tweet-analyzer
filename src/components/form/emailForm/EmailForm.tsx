// components/emailForm/EmailForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface EmailFormProps {
  onEmailSubmit: (email: string) => void;
  loading: boolean; // Novo prop para controlar o carregamento
}

const schema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
});

const EmailForm: React.FC<EmailFormProps> = ({ onEmailSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{ email: string }> = ({ email }) => {
    onEmailSubmit(email);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5" gutterBottom>
        Insira seu e-mail
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <TextField
          fullWidth
          label="E-mail"
          variant="outlined"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={loading} // Desabilita o botão durante o carregamento
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Enviar Código de Verificação"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default EmailForm;
