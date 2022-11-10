const { Comment } = require("../models");


module.exports = {
    getComment: async (comment_id) => {
console.log('in comments');
    },

    getCommentsByUser: async (user_id) => {
        console.log('in get comments');
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

        console.info(comments);
        return comments;
    }
};
