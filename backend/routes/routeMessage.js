const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ctrlMessage = require('../controllers/ctrlMessage');
const multer = require('../middlewares/multer-config')

router.get('/:receiverId', auth, ctrlMessage.getMessages);
router.post('/', auth, multer, ctrlMessage.sendMessage);
router.put('/:id/read', auth, multer, ctrlMessage.markAsRead);
router.delete('/:id', auth, ctrlMessage.deleteMessage);

module.exports = router;
