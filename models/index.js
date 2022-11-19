const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');

Blog.belongsTo(User, {
    foreignKey: 'blog_created_by'
});

Comment.belongsTo(User, {
    foreignKey: 'comment_created_by'
});

Comment.belongsTo(Blog, {
});


User.hasMany(Blog, {
    foreignKey: 'blog_created_by',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'comment_created_by',
    onDelete: 'CASCADE'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Blog, Comment };