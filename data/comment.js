const { Comment } = require("../models");
const { checkPermissions } = require("../utils/auth");


module.exports = {
    getCommentById: async (comment_id) => {
        const commentData = await Comment.findByPk(comment_id);
        if (!commentData) {
            return res.status(404).json({ message: 'No comment found' });
        }
        const comment = commentData.get({ plain: true });

        return comment;
    },

    getCommentsByUser: async (user_id) => {
        const commentData = await Comment.findAll({
            where: {
                comment_created_by: user_id
            },
        });

        if (!commentData) {
            throw new Error('No comments found');
        }

        const comments = await commentData.map((comment) => {
            return comment.get({ plain: true });
        });

        return comments;
    }
};
