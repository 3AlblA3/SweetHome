const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const checkConversation = require('../middlewares/checkConversation');
const ctrlConversation = require('../controllers/ctrlConversation');

router.get('/', auth, ctrlConversation.getConversations);
router.post('/', auth, ctrlConversation.createConversation);
router.delete('/:id', auth, checkConversation, ctrlConversation.deleteConversation);

module.exports = router;
