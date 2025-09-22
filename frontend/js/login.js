document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:YOUR_BACKEND_PORT/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    });
});