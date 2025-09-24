const Message = require("../models/modelMessage");
const fs = require('fs');

//Affichage les messages d'une conversation 
exports.getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.findAll({
            where: { conversation_id: conversationId },
            order: [['sent_at', 'ASC']]
        });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Création et envoi d'un message
exports.sendMessage = async (req, res) => {
    try {
        const userId = req.auth.user_id;
        const { conversation_id, content } = req.body;

        const newMessage = req.file ? {
            sender_id: userId,
            conversation_id,
            content,
            image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            sender_id: userId,
            conversation_id,
            content
        };

        const message = await Message.create(newMessage);

        res.status(201).json({ message: "Message sent", data: message });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        await Message.update({ seen_at: new Date() }, { where: { id } });

        res.status(200).json({ message: "Message marked as read" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateMessage = async (req, res, next) => {
    try {
        const messageId = req.params.id;
        const messageObject = req.file ? {
            ...req.body,
            user_id: req.auth.user_id,
            image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            ...req.body,
            user_id: req.auth.user_id,
        }
        
        delete messageObject.id; 

        await Message.update(messageObject, {where: { id: messageId }});

        res.status(200).json({ message: 'Message modified!' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findByPk(id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found!' });
        }

        if (message.image_url) {
            const filename = message.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, async (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                }
                await Message.destroy({ where: { id } });
                res.status(200).json({ message: 'Message deleted!' });
            });
        } else {
            await Message.destroy({ where: { id } });
            res.status(200).json({ message: 'Message deleted!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
