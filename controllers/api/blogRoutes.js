const router = require('express').Router();
const { Blog } = require('../../models');
const { dataBlog, dataComment } = require('../../data');
const { checkAuth, checkPermissions } = require('../../utils/auth');


// Create a new blog post
router.post('/', checkAuth, async (req, res) => {
    try {
        const blogData = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            blog_created_by: req.session.user_id
        });

        const blog = await blogData.get({ plain: true });

        console.log('blog', blog);
        res.status(200).json(blog);

        return blog.id;

    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a single blog by Id
router.put('/:id', checkAuth, async (req, res) => {
    try {
        const blog = await dataBlog.getBlogById(req.params.id);
        if (checkPermissions(req.session.user_id, blog.blog_created_by)) {
            await Blog.update(req.body, {
                where: {
                    id: req.params.id
                },
            });
            res.render('blog', {
                blog,
                username: req.session.username,
                user_id: req.session.user_id,
                logged_in: req.session.logged_in
            });

            res.status(200).json(blog);

        }


    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a single blog by Id
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const blog = await dataBlog.getBlogById(req.params.id);

        if (!blog) {
            res.status(404).json({ message: 'No blog found!' });
            return;
          } else if (checkPermissions(req.session.user_id, blog.blog_created_by)) {
            await Blog.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.render('homepage', {
                username: req.session.username,
                logged_in: req.session.logged_in
            });

            res.status(200).json(blog);
        }


    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;