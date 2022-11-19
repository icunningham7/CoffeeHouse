const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    const allUsers = await User.findAll();
    const users = await allUsers.map((user) => {
        return user.get({ plain: true });
    })

console.info(`\n\n\n FINISHED USERS \n\n\n\n`);
    
    let blogs;

    for (blog of blogData) {
        await Blog.create({
            ...blog,
            blog_created_by: users[Math.floor(Math.random() * users.length)].id
        });

        const allBlogs = await Blog.findAll();
        blogs = await allBlogs.map((blog) => {
            return blog.get({ plain: true });
        });
    };

console.info(`\n\n\n FINISHED BLOGS \n\n\n\n`);

    for (comment of commentData) {
        await Comment.create({
            ...comment,
            blog_id: blogs[Math.floor(Math.random() * blogs.length)].id,
            comment_created_by: users[Math.floor(Math.random() * users.length)].id
        });

        const allComments = await Comment.findAll();
        const comments = await allComments.map((comment) => {
            return comment.get({ plain: true });
        });
    }


console.info(`\n\n\n FINISHED COMMENTS \n\n\n\n`);

    process.exit(0);
};

seedDatabase();