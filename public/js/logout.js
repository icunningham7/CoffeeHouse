const logoutHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/profile/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        Swal.fire({
            toast: true,
            title: 'Failed to logout.',
            icon: 'error',
            timer: 2000,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            showConfirmationButton: false,
        });
    }
};

document.querySelector('#logout').addEventListener('click', logoutHandler);