

// document.addEventListener('DOMContentLoaded', () => {
//     // Hämta formulären
//     const loginForm = document.getElementById('loginForm');
//     console.log(`HÄR ÄR LOGINFORM`, loginForm);
    

//     // Lägg till submit-händelsehanterare för inloggningsformuläret
//     loginForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const formData = new FormData(loginForm);
//         const data = Object.fromEntries(formData.entries());

//         try {
//             const response = await fetch('http://localhost:8000/api/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data)
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 console.log(`HÄR ÄR RESPONSE: `, response);
//                 window.location.href = './account.html';
//             } else {
//                 alert(result.message || 'Login failed');
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//         }
//     });
// })

// document.addEventListener('DOMContentLoaded', () => {
//     const registerForm = document.querySelector('#regForm');
    
//     if (!registerForm) {
//         console.error("No form with id 'regForm' found.");
//         return;
//     }

//     registerForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         const formData = new FormData(registerForm);
//         const data = Object.fromEntries(formData.entries());
//         console.log('Här är data:', data);

//         try {
//             const response = await fetch('http://localhost:8000/api/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data)
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 console.log('HÄR ÄR RESPONSE:', result);
//                 window.location.href = './index.html';
//             } else {
//                 alert(result.message || 'Registration failed');
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//             alert('An error occurred during registration. Please try again.');
//         }
//     });
// });

// async function getAPI() {
//     try {
//         const response = await fetch('http://localhost:8000/api/users');
//         if(!response.ok){
//             throw new Error(`This is not working, ${response.status}`)
//         }
//         const userData = await response.json()
//         console.log(`userData:`, userData);
//     } catch (error) {
//         console.error(error);
//     }
// }

// getAPI()

document.addEventListener('DOMContentLoaded', () => {

    const registerForm = document.querySelector('#regForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Här är data:', data);

            try {
                const response = await fetch('http://localhost:8000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                if (response.ok) {
                    console.log('HÄR ÄR RESPONSE:', result);
                    window.location.href = './index.html';
                } else {
                    alert(result.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('An error occurred during registration. Please try again.');
            }
        });
    } else {
        console.log("No form with id 'regForm' found.");
    }

    const loginForm = document.querySelector('#loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Login data:', data);

            try {
                const response = await fetch('http://localhost:8000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                if (response.ok) {
                    console.log('Login successful:', result);
                    window.location.href = `./account.html?username=${encodeURIComponent(data.username)}`;
                } else {
                    alert(result.message || 'Login failed');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    } else {
        console.log("No form with id 'loginForm' found.");
    }
});


async function getAPI() {
    try {
        const response = await fetch('http://localhost:8000/api/users');
        if (!response.ok) {
            throw new Error(`This is not working, ${response.status}`);
        }
        const userData = await response.json();
        console.log('userData:', userData);
    } catch (error) {
        console.error(error);
    }
}

getAPI();