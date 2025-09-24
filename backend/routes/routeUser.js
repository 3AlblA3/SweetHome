const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ctrlUser = require('../controllers/ctrlUser');
const multer = require('../middlewares/multer-config')

// Route pour récupérer les informations de l'utilisateur authentifié
router.get('/me', auth, ctrlUser.getAuthenticatedUser);

// Routes pour afficher les informations des utilisateurs
router.get('/', auth, ctrlUser.getAllUsers);
router.get('/:id', auth, ctrlUser.getOneUser);

// Routes pour l'identification, création de compte et déconnexion
router.post('/signup', ctrlUser.signup); 
router.post('/login', ctrlUser.login);
router.post('/logout', auth, ctrlUser.logout);

// Routes pour la mise à jour et la suppression d'un utilisateur
router.put('/:id', auth, multer, ctrlUser.updateUser); 
router.delete('/:id', auth, ctrlUser.deleteUser);

module.exports = router;
