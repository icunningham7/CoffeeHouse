const router = require('express').Router();
const { dataBlog, dataComment } = require('../data');
const {checkAuth, checkPermissions} = require('../utils/auth');

// Dashboard - Blogs for by the authenticated user
router.get('/', checkAuth, async (req, res) => {
    try {
        const blogs = await dataBlog.getBlogsByUser(req.session.user_id);
        res.render('homepage', {
            blogs,
            username: req.session.username,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Single Blog by ID
router.get('/:id', checkAuth, async (req, res) => {
    try {
        const blog = await dataBlog.getBlogById(req.params.id);
        console.log(blog);
        res.render('blog', {
            blog,
            username: req.session.username,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User Dashboard - All blogs by user id
router.get('/user/:userId', checkAuth, async (req, res) => {
    try {
        const blogs = await dataBlog.getBlogsByUser(req.params.userId);
        res.render('homepage', {
            blogs,
            username: req.session.username,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;