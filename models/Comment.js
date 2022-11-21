const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        is_edited: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT('medium'),
            allowNull: false,
        },
        blog_id: {
            type: DataTypes.UUID, 
            references: {
                model: 'blog',
                key: 'id',
                unique: false
            }
        },
        comment_created_by: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id'
            }
        }

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;