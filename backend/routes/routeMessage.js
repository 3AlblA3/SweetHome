const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const ctrlMessage = require('../controllers/ctrlMessage');

router.get('/:receiverId', auth, ctrlMessage.getMessages);
router.post('/', auth, ctrlMessage.sendMessage);
router.put('/:id/read', auth, ctrlMessage.markAsRead);
router.delete('/:id', auth, ctrlMessage.deleteMessage);

module.exports = router;
