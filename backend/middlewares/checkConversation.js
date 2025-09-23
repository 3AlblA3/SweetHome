const Conversation = require('../models/modelConversation');

module.exports = async (req, res, next) => {
  try {
    const conversationId = req.params.id;
    const { userId } = req.auth.user_id;
    const conversation = await Conversation.findByPk(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found!' });
    }
    if (conversation.user1_id !== userId && conversation.user2_id !== userId) {
      return res.status(403).json({ message: 'Forbidden: you are not allowed to do that!' });
    }
    req.conversation = conversation;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
