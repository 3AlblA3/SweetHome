const express = require ('express')
const path = require('path'); 
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Import des routes

const routeUser = require('./routes/routeUser');
const routePost = require('./routes/routePost');
const routeMessage = require('./routes/routeMessage');
const routeConversation = require('./routes/routeConversation');

app.use(express.json());
app.use(cookieParser());

// Autorisation du CORS

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4000',
  credentials: true, 
}));

// Utilisation de nos routes

app.use('/users', routeUser);
app.use('/posts', routePost);
app.use('/messages', routeMessage);
app.use('/conversations', routeConversation);

module.exports = app