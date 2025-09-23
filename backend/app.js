const express = require ('express')
const path = require('path'); 
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Import des routes

const routeUser = require('./routes/routeUser');
const routePost = require('./routes/routePost');

// Messaging Routes

const routeMessage = require('./routes/routeMessage');

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

// Route des messages 
app.use('/messages', routeMessage);

module.exports = app