const Message = require('../models/modelMessage');

module.exports = async (req, res, next) => {
    try {
        const messageId = req.params.id; 
        const message = await Message.findByPk(messageId); 
        if (!message) {
            return res.status(404).json({ message: 'Message not found!' }); 
        }   
        if (message.user_id !== req.auth.user_id && req.auth.admin !== true) {
            return res.status(403).json({ message: 'Forbidden: you are not allowed to do that!' });
        }
        req.message = message;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

