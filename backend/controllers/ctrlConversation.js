const Conversation = require('../models/modelConversation');
const { Op } = require('sequelize');

//Controller des conversations
// !!!!Attention!!!!! La conversation doit être créee AVANT 
// l'envoi du premier message.

exports.getConversations = async (req, res) => {
  try {
    const userId = req.auth.user_id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [
          { user1_id: userId },
          { user2_id: userId }
        ]
      },
      order: [['updated_at', 'DESC']]
    });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createConversation = async (req, res) => {
  try {
    const userId = req.auth.user_id;
    const { otherUserId } = req.body;
    // Empêcher la création d'une conversation avec soi-même
    if (userId === otherUserId) {
      return res.status(400).json({ error: 'Cannot create conversation with yourself.' });
    }
    // Vérifier si une conversation entre ces deux utilisateurs existe déjà
    let conversation = await Conversation.findOne({
      where: {
          [Op.or]: [
            { user1_id: userId, user2_id: otherUserId },
            { user1_id: otherUserId, user2_id: userId }
          ]
      }
    });
    if (conversation) {
      return res.status(200).json(conversation);
    }
    // Créer une nouvelle conversation
    conversation = await Conversation.create({ user1_id: userId, user2_id: otherUserId });
    res.status(201).json(conversation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    await Conversation.destroy({ where: { id } });
    res.status(200).json({ message: 'Conversation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
