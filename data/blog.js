const { User, Blog, Comment } = require("../models");


module.exports = {
    getBlogById: async (blog_id) => {
    },

    getBlogsByUser: async (user_id) => {
        const blogData = await Blog.findAll({
            where: {
                blog_created_by: user_id
            },
            include: [
                {
                    model: User,
                    attributes:  [ 'username' ]
                },
                {
                model: Comment
                }
            ]
        });

        if (!blogData) {
            throw new Error('No blogs found');
        }

        const blogs = await blogData.map((blog) => {
            console.log(blog);
            return blog.get({ plain: true });
        });

        console.info(blogs);
        return blogs;
    }
};
