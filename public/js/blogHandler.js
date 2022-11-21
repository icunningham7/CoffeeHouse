const blogError = (operation = 'get') => {
    return Swal.fire({
        toast: true,
        title: `Unable to ${operation} your blog`,
        icon: 'error',
        timer: 2000,
        allowEscapeKey: true,
        showConfirmationButton: false,
    });
};


const revealBlogEditor = async (event) => {
    event.preventDefault();

    const blog = document.querySelector('#blog');
    const blogId = blog.dataset.blogId;
    const blogTitle = document.querySelector('.title').textContent;
    const blogArticle = document.querySelector('.article').textContent;

    const blogForm = document.createElement('form');
    blogForm.classList.add('flex', 'flex-col')

    const blogTitleLabel = document.createElement('label');
    blogTitleLabel.setAttribute('for', 'edit-blog-title');
    blogTitleLabel.textContent = 'Title:';


    const blogTitleField = document.createElement('input');
    blogTitleField.setAttribute('id', 'edit-blog-title');
    blogTitleField.setAttribute('data-blog-id', blogId);
    blogTitleField.setAttribute('type', 'text');
    blogTitleField.setAttribute('name', 'edit-blog-title');
    blogTitleField.classList.add('pb-4', 'mb-5');
    blogTitleField.required = true;
    blogTitleField.value = blogTitle;

    const blogArticleLabel = document.createElement('label');
    blogArticleLabel.setAttribute('for', 'edit-blog-article');
    blogArticleLabel.textContent = 'Content:';

    const blogArticleField = document.createElement('textarea');
    blogArticleField.setAttribute('id', 'edit-blog-article');
    blogArticleField.classList.add('form-input', 'textarea');
    blogArticleField.setAttribute('spellcheck', 'true');
    blogArticleField.setAttribute('name', 'edit-blog-article');
    blogArticleField.classList.add('pb-4', 'mb-5', 'h-[30rem]');
    blogArticleField.required = true;
    blogArticleField.value = blogArticle;

    const blogFormSubmitBtn = document.createElement('button');
    blogFormSubmitBtn.classList.add('self-center', 'rounded', 'p-2', 'm-2', 'bg-teal-600', 'hover:bg-teal-800', 'hover:outline', 'hover:outline-2', 'hover:outline-offset-4', 'hover:outline-teal-600/50', 'text-3xl', 'text-[#f6f6f2]');
    blogFormSubmitBtn.setAttribute('type', 'submit');
    blogFormSubmitBtn.textContent = 'Submit';
    blog.innerHTML = '';

    blog.appendChild(blogForm);
    blogForm.appendChild(blogTitleLabel);
    blogForm.appendChild(blogTitleField);
    blogForm.appendChild(blogArticleLabel);
    blogForm.appendChild(blogArticleField);
    blogForm.appendChild(blogFormSubmitBtn);

    blogForm.addEventListener('submit', editBlog);
};

const editBlog = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#edit-blog-title').value.trim();
    const content = document.querySelector('#edit-blog-article').value.trim();
    const blogRoute = document.querySelector('#edit-blog-title').dataset.blogId;

    if (title && content && blogRoute) {
        const response = await fetch(`/api/blog/${blogRoute}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            location.reload();
        } else {
            blogError('edit');
        }
    }
};

const addBlog = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch('/api/blog/', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Send user their dashboard to see their blog posts with the newest entry at the top of the list
            location.href = '/blog';
        } else {
            blogError('create');
        }
    }
};

const deleteBlog = async (event) => {
    event.preventDefault();
    const blog_id = document.querySelector('#blog').dataset.blogId;

    if (blog_id) {
        const response = await fetch(`/api/blog/${blog_id}`, {
            method: 'DELETE',
            // body: JSON.stringify({ blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Send user their dashboard to see their blog posts with the deleted post removed
            location.href = '/blog';
        } else {
            blogError('delete');
        }
    }
};

const submitBlogBtn = document.querySelector('#add-blog-form');
    if (submitBlogBtn) submitBlogBtn.addEventListener('submit', addBlog);
const editBlogBtn = document.querySelector('.edit-blog');
if (editBlogBtn) editBlogBtn.addEventListener('click', revealBlogEditor);
const deleteBlogBtn = document.querySelector('.delete-blog');
if (deleteBlogBtn) deleteBlogBtn.addEventListener('click', deleteBlog);