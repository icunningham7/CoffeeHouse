const loginHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.toLowerCase().trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/profile/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            Swal.fire({
                toast: true,
                title: 'Incorrect Username or Password',
                icon: 'warning',
                timer: 2000,
                allowOutsideClick: true,
                allowEscapeKey: true,
                allowEnterKey: true,
                showConfirmationButton: false,
            });

        }
    }
};

const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.toLowerCase().trim();
    const password = document.querySelector('#password-signup').value.trim();
    const passwordConfirmation = document.querySelector('#password-confirm-signup').value.trim();

    if (password === passwordConfirmation) {

        if (username && password) {
            const response = await fetch('/api/profile/', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                document.location.replace('/');
            } else {
                Swal.fire({
                    toast: true,
                    title: 'Incorrect Username or Password',
                    icon: 'warning',
                    timer: 2000,
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    allowEnterKey: true,
                    showConfirmationButton: false,
                });
    
            }
        }
    } else {
        Swal.fire({
            toast: true,
            title: 'Incorrect Username or Password',
            icon: 'warning',
            timer: 2000,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            showConfirmationButton: false,
        });
    }


};

document.querySelector('#login-form').addEventListener('submit', loginHandler);
document.querySelector('#signup-form').addEventListener('submit', signupHandler);
