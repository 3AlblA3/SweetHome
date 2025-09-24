const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ctrlMessage = require('../controllers/ctrlMessage');
const multer = require('../middlewares/multer-config');
const checkMessage = require('../middlewares/checkMessage');

router.get('/:conversationId', auth, checkMessage, ctrlMessage.getMessages);
router.post('/', auth, multer, ctrlMessage.sendMessage);
router.put('/:id/read', auth, multer, checkMessage, ctrlMessage.markAsRead);
router.delete('/:id', auth, checkMessage, ctrlMessage.deleteMessage);

module.exports = router;
