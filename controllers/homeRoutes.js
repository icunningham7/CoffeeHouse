const router = require('express').Router();
const { User, Blog } = require('../models');
const checkAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        // console.log(blogData);

        const blogs = blogData.map((blog) => {
            return blog.get({ plain: true })
        });
        console.log('blogs:');
        console.log(blogs);

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;