const router = require('express').Router();
const { dataBlog, dataComment } = require('../data');
const { checkAuth, checkPermissions } = require('../utils/auth');

// Homepage - All blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await dataBlog.getBlogs();
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

// Form to create a new blog post
router.get('/new', checkAuth, async (req, res) => {
    try {
        res.render('new-blog', {
            username: req.session.username,
            user_id: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Dashboard - Blogs for by the authenticated user
router.get('/dashboard', checkAuth, async (req, res) => {
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


// Login page for unauthenticated users
router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        } else {
            res.render('login', {
                logged_in: req.session.logged_in
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;