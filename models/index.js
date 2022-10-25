const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
    foreignKey: 'created_by',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'created_by',
    onDelete: 'CASCADE'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'created_by'
});

Comment.belongsTo(User, {
    foreignKey: 'created_by'
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comment };