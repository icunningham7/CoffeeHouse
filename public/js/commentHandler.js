const commentError = (operation = 'get') => {
    return Swal.fire({
        toast: true,
        title: `Unable to ${operation} your comment`,
        icon: 'error',
        timer: 2000,
        allowEscapeKey: true,
        showConfirmationButton: false,
    });
};


const revealCommentForm = async (event) => {
    event.preventDefault();
    const addComment = document.querySelector('#add-comment-form');
    addComment.classList.remove('hidden');
    document.querySelector('#add-comment').classList.add('hidden');
};

const revealCommentEditor = async (event) => {
    event.preventDefault();

    const commentId = event.target.closest('.comment-id').dataset.commentId;
    const commentField = event.target.closest('.comment-id');
    const comment = event.target.closest('.comment-id').querySelector('h2');
    const commentText = comment.textContent;
    const commentForm = document.createElement('form');
    const commentFormLabel = document.createElement('label');
    commentFormLabel.setAttribute('for', 'edit-comment-field');
    const commentFormField = document.createElement('input');
    commentFormField.setAttribute('id', 'edit-comment-field');
    commentFormField.setAttribute('data-comment-id', commentId);
    commentFormField.setAttribute('type', 'text');
    commentFormField.setAttribute('name', 'edit-comment');
    commentFormField.required = true;
    commentFormField.value = commentText;
    const commentFormSubmitBtn = document.createElement('button');
    commentFormSubmitBtn.classList.add('btn', 'btn-primary');
    commentFormSubmitBtn.setAttribute('type', 'submit');
    commentFormSubmitBtn.textContent = 'Submit';
    commentField.innerHTML = '';

    commentField.appendChild(commentForm);
    commentForm.appendChild(commentFormLabel);
    commentForm.appendChild(commentFormField);
    commentForm.appendChild(commentFormSubmitBtn);

    commentForm.addEventListener('submit', editComment);
};

const editComment = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#edit-comment-field').value.trim();
    const commentRoute = document.querySelector('#edit-comment-field').dataset.commentId;

    if (content && commentRoute) {
        const response = await fetch(`/api/comment/${commentRoute}`, {
            method: 'PUT',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            location.reload();
        } else {
            commentError('edit');
        }
    }
};

const addComment = async (event) => {
    event.preventDefault();
    const content = document.querySelector('#new-comment').value.trim();
    const blog_id = document.querySelector('#blog-id').dataset.blogId;

    if (content && blog_id) {
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({ content, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            location.reload();
        } else {
            commentError('create');
        }
    }
};

const deleteComment = async (event) => {
    event.preventDefault();

    const comment_id = event.target.closest('.comment-id').dataset.commentId;

    if (comment_id) {
        const response = await fetch(`/api/comment/${comment_id}`, {
            method: 'DELETE',
            // body: JSON.stringify({ content, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            location.reload();
        } else {
            commentError('create');
        }
    }
};


const addCommentBtn = document.querySelector('#add-comment');
    if (addCommentBtn) addCommentBtn.addEventListener('click', revealCommentForm);
const submitCommentBtn = document.querySelector('#add-comment-form');
    if (submitCommentBtn) submitCommentBtn.addEventListener('submit', addComment);
const editCommentBtns = document.querySelectorAll('.edit-comment');
if (editCommentBtns) {
        editCommentBtns.forEach(btn => {
            btn.addEventListener('click', revealCommentEditor);
        });
};
const deleteCommentBtns = document.querySelectorAll('.delete-comment');
if (deleteCommentBtns) {
        deleteCommentBtns.forEach(btn => {
            btn.addEventListener('click', deleteComment);
        });
};