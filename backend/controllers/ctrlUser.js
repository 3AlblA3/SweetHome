const User = require("../models/modelUser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');

// Afficher tout les utilisateurs

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer les informations de l'utilisateur connecté
exports.getAuthenticatedUser = async (req, res) => {
    try {
        const userId = req.auth.user_id;
        const user = await User.findByPk(userId, { 
            attributes: ['id', 'first_name', 'last_name', 'email']  
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        });
    } catch (error) {
        console.error('Error in getAuthenticatedUser:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Créer un compte

exports.signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            where: { email: req.body.email },
            paranoid: false
        });

        if (existingUser) {
            if (existingUser.deletedAt) {
                const passwordValid = await bcrypt.compare(req.body.password, existingUser.password);
                if (passwordValid) {
                    await User.restore({ where: { id: existingUser.id } });
                    return res.status(200).json({ message: 'User restored' });
                } else {
                    return res.status(401).json({ error: "Wrong password" });
                }
            } else {
                return res.status(400).json({ error: "Email already in use" });
            }
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({ 
            admin: req.body.admin,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            number: req.body.number,
            password: hash,
        });
    
        res.status(201).json({ message: 'User created!', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Quand l'user se connecte au site

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(401).json({ error: 'Invalid email/password!' });

        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid email/password!' });

        const token = jwt.sign(
            { user_id: user.id, role_id: user.role_id },
            process.env.JWT_SECRET,
            { algorithm: 'HS256', expiresIn: '24h' }
        );

        // Set token in HTTP-Only Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.status(200).json({ message: 'Logged in successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Déconnexion
exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });
    res.status(200).json({ message: 'Logged out successfully!' });
};

//Récupérer les informations d'un user

exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found!' });

        res.status(200).json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        const updatedData = req.file ? {
            ...req.body,
            picture_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            ...req.body
        };

        if (req.file && user.picture_url) {
            const filename = user.picture_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, err => {
                if (err) console.error('Error deleting old user picture:', err);
            });
        }
        await User.update(updatedData, { where: { id: userId } });
        res.status(200).json({ message: 'User updated!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        if (user.picture_url) {
            const filename = user.picture_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, async (err) => {
                if (err) {
                    console.error('Error deleting user picture:', err);
                }
                await User.destroy({ where: { id: userId } });
                res.status(200).json({ message: 'User deleted!' });
            });
        } else {
            await User.destroy({ where: { id: userId } });
            res.status(200).json({ message: 'User deleted!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};