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
  origin: 'http://localhost:4000',
  credentials: true
}));

// Gestion des images

app.use('/images', express.static(path.join(__dirname, 'images')));

// Utilisation de nos routes

app.use('/users', routeUser);
app.use('/posts', routePost);
app.use('/messages', routeMessage);
app.use('/conversations', routeConversation);

module.exports = app