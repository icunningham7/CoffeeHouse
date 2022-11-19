const { User, Blog, Comment } = require("../models");


module.exports = {
    getBlogById: async (blog_id) => {
        const blogData = await Blog.findByPk(blog_id, {
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username', 'id'],
                        },
                    ],
                },

            ],
            order: [
                [Comment, 'createdAt', 'ASC']
            ]
        });


        if (!blogData) {
            return res.status(404).json({ message: 'No blogs found!' });
        }

        const blogs = await blogData.get({ plain: true });

        return blogs;
    },

    getBlogsByUser: async (user_id) => {
        const blogData = await Blog.findAll({
            where: {
                blog_created_by: user_id
            },
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
        });

        if (!blogData) {
            return res.status(404).json({ message: 'No blogs found!' });
        }

        const blogs = await blogData.map((blog) => {
            return blog.get({ plain: true });
        });

        return blogs;
    },

    getBlogs: async () => {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
        });

        if (!blogData) {
            return res.status(404).json({ message: 'No blogs found!' });
        }

        const blogs = await blogData.map((blog) => {
            return blog.get({ plain: true });
        });

        return blogs;
    }
};
