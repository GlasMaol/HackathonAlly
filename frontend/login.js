document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');

    if (!loginForm) {
        console.error('Ingen login form hittades');
        return;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());
        console.log('login data: ', data);

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await response.json();
            if (response.ok) {
                console.log('login successful: ', result);
                window.location.href = './account.html';
            } else {
                alert(result.message || 'login fejld');
            }
        } catch (error) {
            console.error('Error during login: ', error);
            alert('A solar event occurred durin login, plese try again.');
        }
    })
})