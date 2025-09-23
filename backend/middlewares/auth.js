const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.error("No token found in cookies"); // Debug

            return res.status(401).json({ message: 'No token provided' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

        req.auth = {
            user_id: decodedToken.user_id,
            role_id: decodedToken.role_id,
        };

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
