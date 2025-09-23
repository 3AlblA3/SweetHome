const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    sender_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    receiver_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    seen: { type: DataTypes.BOOLEAN, defaultValue: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    seen_at: { type: DataTypes.DATE, allowNull: true }
}, { underscored: true });

module.exports = Message;
