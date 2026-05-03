// Authentication
let isLoginMode = true;

function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
}

function switchAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('modalTitle').textContent = isLoginMode ? 'Login' : 'Sign Up';
}

function handleAuth() {
    const email = document.getElementById('loginEmail').value;
    if (email) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        document.getElementById('userName').textContent = email.split('@')[0];
        showToast(isLoginMode ? 'Logged in successfully!' : 'Account created!', 'success');
        closeAuthModal();
    } else {
        showToast('Please enter email', 'error');
    }
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('authModal').classList.remove('flex');
}

// Check login status on load
if (localStorage.getItem('isLoggedIn') === 'true') {
    const email = localStorage.getItem('userEmail');
    if (email) document.getElementById('userName').textContent = email.split('@')[0];
}