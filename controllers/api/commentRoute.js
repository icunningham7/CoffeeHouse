const router = require('express').Router();
const { Comment } = require('../../models');
const { dataBlog, dataComment } = require('../../data');
const { checkAuth, checkPermissions } = require('../../utils/auth');


// Create a new comment post
router.post('/', checkAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.content,
            blog_id: req.body.blog_id,
            comment_created_by: req.session.user_id
        });

        const comment = await commentData.get({ plain: true });

        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a single comment by Id
router.put('/:id', checkAuth, async (req, res) => {
    try {
        const comment = await dataComment.getCommentById(req.params.id);
        if (checkPermissions(req.session.user_id, comment.comment_created_by)) {
            await Comment.update(
                {
                    content: req.body.content,
                    is_edited: true,
                },
                {
                    where: {
                        id: req.params.id
                    },

                });

            res.status(200).json(comment);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a single comment by Id
router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const comment = await dataComment.getCommentById(req.params.id);
        if (checkPermissions(req.session.user_id, comment.comment_created_by)) {
            await Comment.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json(comment);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;