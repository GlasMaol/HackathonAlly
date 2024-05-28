
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    
    if (username) {
        const welcomeMessage = document.querySelector('#welcomeMessage');
        welcomeMessage.textContent = `Grattis ${username}, du är inloggad!`;
    } else {
        alert('Ingen användare är inloggad.');
        window.location.href = './index.html'; // Redirect to login page if no user is logged in
    }

    const logoutBtn = document.querySelector('#logoutBtn');
    logoutBtn.addEventListener('click', () => {
        window.location.href = './index.html'; // Redirect to login page on logout
    });
});