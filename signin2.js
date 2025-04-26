// DOM Elements
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const goToLogin = document.getElementById('goToLogin');
const goToRegister = document.getElementById('goToRegister');
const loginForm = document.getElementById('login');
const registerForm = document.getElementById('register');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('responsive');
});

// Close menu when clicking on links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('responsive');
    });
});

// Switch between login and register forms
function showLoginForm() {
    loginForm.style.left = '4px';
    registerForm.style.right = '-520px';
    loginBtn.classList.add('white-btn');
    registerBtn.classList.remove('white-btn');
}

function showRegisterForm() {
    loginForm.style.left = '-510px';
    registerForm.style.right = '5px';
    loginBtn.classList.remove('white-btn');
    registerBtn.classList.add('white-btn');
}

// Event listeners for form switching
loginBtn.addEventListener('click', showLoginForm);
registerBtn.addEventListener('click', showRegisterForm);
goToLogin.addEventListener('click', showLoginForm);
goToRegister.addEventListener('click', showRegisterForm);

// Form submission - just reset the form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // optionally, validate credentials here    
    // For now, redirect directly    
    
    window.location.href = "builder.html";
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    showLoginForm();
});