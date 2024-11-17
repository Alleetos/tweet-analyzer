// templates/confirmationEmailTemplate.ts

export const generateConfirmationEmailTemplate = (confirmationCode: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; background-color: #f4f8fb; color: #333;">
    <div style="text-align: center; padding: 20px;">
      <h2 style="color: #1DA1F2;">Bem-vindo à Análise de Perfil</h2>
    </div>

    <p style="font-size: 16px; color: #333; text-align: center;">
      Olá! Estamos animados para ajudar você a entender o seu perfil e analisar seu sentimento online.
    </p>

    <p style="font-size: 16px; color: #333; text-align: center;">
      Para acessar o formulário de análise, por favor, use o código de confirmação abaixo:
    </p>

    <div style="font-size: 28px; font-weight: bold; color: #4CAF50; padding: 10px 0; text-align: center; border: 1px dashed #ddd; border-radius: 4px; background-color: #fff;">
      ${confirmationCode}
    </div>

    <p style="font-size: 14px; color: #666; text-align: center;">
      Este código expira em 5 minutos. Se você não solicitou este código, ignore este email.
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="font-size: 12px; color: #999; text-align: center;">
      © 2024 Tweet Analyzer. Todos os direitos reservados.
    </p>
  </div>
`;
