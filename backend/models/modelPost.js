const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define(
    'Post', {
        id: { type: DataTypes.INTEGER, allowNull: false,  primaryKey: true, autoIncrement: true},
        content: {type: DataTypes.STRING, allowNull: false},
        user_id: {type: DataTypes.INTEGER, references: {model: 'users', key: 'id'}},
        picture_url: { type: DataTypes.STRING, allowNull: true }
    },
    {tableName: 'posts',
    underscored: true,
    timestamps: true}
);

module.exports = Post;
