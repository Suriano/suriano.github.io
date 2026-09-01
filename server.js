// Carrega as variáveis do arquivo .env quando rodando localmente
require('dotenv').config(); 

const mongoose = require('mongoose');

// O processo lê a variável do ambiente (seja local do .env ou configurada no Render)
const mongoURI = process.env.MONGO_URI; 

if (!mongoURI) {
  console.error("Erro: A variável MONGO_URI não foi definida!");
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log("Conectado ao MongoDB com sucesso! 🎉"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
