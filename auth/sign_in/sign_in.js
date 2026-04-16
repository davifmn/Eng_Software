document.getElementById('btnBack').addEventListener('click', () => {
    window.location.href = '../welcome/welcome_screen.html';
});

document.getElementById('signInForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Tentativa de login (lógica a ser implementada!)');
});