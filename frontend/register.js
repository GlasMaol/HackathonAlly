document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#regForm');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());
        console.log(`Här är data`, data); // Lägg till denna rad för felsökning

        try {
            const jsonString = JSON.stringify(data);
            console.log('JSON stringified data:', jsonString);

            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: jsonString
            });
            const textResponse = await response.text(); // Read response as text first for better debugging
            console.log('Raw response text:', textResponse); // Log raw response

            let result;
            try {
                result = JSON.parse(textResponse); // Try to parse JSON from response
            } catch (parseError) {
                throw new SyntaxError(`Failed to parse JSON response: ${textResponse}`);
            }
            if (response.ok) {
                console.log(`HÄR ÄR RESPONSE: `, response);
                window.location.href = './index.html';
            } else {
                alert(result.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    });
});

async function getAPI() {
    try {
        const response = await fetch('http://localhost:8000/api/users');
        if (!response.ok) {
            throw new Error(`This is not working, ${response.status}`);
        }
        const userData = await response.json();
        console.log(`userData:`, userData);
    } catch (error) {
        console.error(error);
    }
}