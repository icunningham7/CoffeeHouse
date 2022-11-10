const router = require('express').Router();
const { dataBlog, dataComment } = require('../../data');
const checkAuth = require('../../utils/auth');

router.get('/', checkAuth, async (req, res) => {
    try {
        const blogs = await dataBlog.getBlogsByUser(req.session.user_id);
        res.render('homepage', {
            blogs,
            username: req.session.username,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', checkAuth, async (req, res) => {
    try {
        const blogs = await dataBlog.getBlogById(req.params.id);
        res.render('homepage', {
            blogs,
            username: req.session.username,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;