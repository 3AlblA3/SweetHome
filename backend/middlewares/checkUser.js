const User = require('../models/modelUser');

// Middleware pour vérifier si l'utilisateur a le droit d'accéder/modifier les données d'un utilisateur spécifique
module.exports = async (req, res, next) => {
    try {

        // Vérification que l'utilisateur existe
        const userId = req.params.id; 
        const user = await User.findByPk(userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); 
        }   
        // Vérification que l'utilisateur est le bon utilisateur ou un admin
        if (user.id !== req.auth.user_id && req.auth.admin !== true) {
            return res.status(403).json({ message: 'Forbidden: you are not allowed to do that!' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

