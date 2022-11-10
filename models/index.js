const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
const { DataTypes } = require('sequelize');

Blog.belongsTo(User, {
    foreignKey: {
        name: 'blog_created_by',
        type: DataTypes.UUID
    }
});

Comment.belongsTo(User, {
    foreignKey: {
        name: 'comment_created_by',
        type: DataTypes.UUID
    }
});

Comment.belongsTo(Blog, {
    foreignKey: {
        name: 'blog_id',
        type: DataTypes.UUID
    }
});


User.hasMany(Blog, {
    foreignKey: {
        name: 'blog_created_by',
        type: DataTypes.UUID
    },
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: {
        name: 'comment_created_by',
        type: DataTypes.UUID
    },
    onDelete: 'CASCADE'
});

Blog.hasMany(Comment, {
    foreignKey: {
        name: 'blog_id',
        type: DataTypes.UUID
    },
    onDelete: 'CASCADE'
});

module.exports = { User, Blog, Comment };