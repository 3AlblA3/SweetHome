const jwt = require('jsonwebtoken');

// Logique d'authentification via token stocké dans un cookie

module.exports = (req, res, next) => {
    try {
        // Recherche du token dans les cookies
        const token = req.cookies.token;
        // S'il n'y a pas de token, on renvoie une erreur 401
        if (!token) {
            console.error("No token found in cookies");

            return res.status(401).json({ message: 'No token provided' });
        }
        // Vérification et décodage du token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

        // Ajout des informations du user dans le payload de la requête
        req.auth = {
            user_id: decodedToken.user_id,
            admin: decodedToken.admin,
        };

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
