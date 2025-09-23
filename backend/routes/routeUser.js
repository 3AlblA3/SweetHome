const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ctrlUser = require('../controllers/ctrlUser');

// User routes
router.get('/me', auth, ctrlUser.getAuthenticatedUser);
router.get('/', auth, ctrlUser.getAllUsers);
router.get('/:id', auth, ctrlUser.getOneUser);
router.post('/signup', ctrlUser.signup); 
router.post('/login', ctrlUser.login);
router.post('/logout', auth, ctrlUser.logout);
router.put('/:id', auth, ctrlUser.updateUser); 
router.delete('/:id', auth, ctrlUser.deleteUser);

module.exports = router;
