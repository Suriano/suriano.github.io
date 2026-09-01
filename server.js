// Carrega as variáveis do arquivo .env quando rodando localmente
//require('dotenv').config(); 
 //const mongoose = require('mongoose');

// O processo lê a variável do ambiente (seja local do .env ou configurada no Render)
//const mongoURI = process.env.MONGO_URI; 

//if (!mongoURI) {
//  console.error("Erro: A variável MONGO_URI não foi definida!");
  //process.exit(1);
//}

//mongoose.connect(mongoURI)
//  .then(() => console.log("Conectado ao MongoDB com sucesso! 🎉"))
 // .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Configurações essenciais para ler dados enviados por formulários HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexão com o MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB com sucesso!"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// 1. Definição do Schema alinhado com o seu banco (Agenda -> Usuarios)
// O terceiro parâmetro 'Usuarios' força o mongoose a usar exatamente o nome da sua coleção existente
const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  senha: { type: String, required: true }
}, { collection: 'Usuarios' });

const Usuario = mongoose.model('Usuario', usuarioSchema);

// 2. Rota para exibir a página HTML de cadastro
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. Rota POST que recebe os dados do formulário HTML e salva no Atlas
app.post('/cadastrar', async (req, res) => {
  try {
    const { nome, senha } = req.body;

    // Cria o novo documento usando os campos do formulário
    const novoUsuario = new Usuario({ nome, senha });
    
    // Salva no MongoDB Atlas
    await novoUsuario.save();

    // Resposta de sucesso simples na tela
    res.send('<h1>Usuário cadastrado com sucesso no Atlas! 🎉</h1><a href="/">Voltar</a>');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao salvar o usuário no banco de dados.');
  }
});

// Inicialização do servidor na porta definida pelo Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});

