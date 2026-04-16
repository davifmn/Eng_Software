document.getElementById('btnBack').addEventListener('click', () => {
    window.location.href = '../welcome/welcome_screen.html';
});

document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Tentativa de cadastro (lógica a ser implementada!)');
});