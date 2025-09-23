const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conversation = sequelize.define('Conversation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  user1_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
  user2_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
}, {
    tableName: 'conversations',
    underscored: true,
    timestamps: true
});

module.exports = Conversation;
