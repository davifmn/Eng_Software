const summaryBox = document.getElementById('summaryBox');

// Busca os dados salvos previamente
const userName = localStorage.getItem('userName') || 'Usuário Não Identificado';
// Como não salvamos o email no login previamente, deixaremos um placeholder, ou tente buscar se tiver
const userEmail = localStorage.getItem('userEmail') || 'N/A'; 
const selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || [];
const finalSlots = JSON.parse(localStorage.getItem('finalSlots')) || [];

// Monta o resumo
summaryBox.innerHTML = `
    <p><strong>Nome:</strong> ${userName}</p>
    <p><strong>Email:</strong> ${userEmail}</p>
    <p><strong>Serviços selecionados:</strong> ${selectedServices.join(', ')}</p>
    <p><strong>Horários:</strong></p>
    <ul>
        ${finalSlots.map(slot => `<li>${slot.day} às ${slot.time}</li>`).join('')}
    </ul>
`;

// Lógica de Copiar o Pix
document.getElementById('btnCopyPix').addEventListener('click', () => {
    const pixKey = document.getElementById('pixKey').innerText;
    navigator.clipboard.writeText(pixKey).then(() => {
        alert('Chave Pix copiada com sucesso!');
    }).catch(err => {
        console.error('Erro ao copiar', err);
    });
});

// Confirmar o Agendamento (Por enquanto, apenas limpa os dados de navegação e volta)
document.getElementById('btnConfirmFinal').addEventListener('click', () => {
    alert('Agendamento finalizado com sucesso! Muito obrigado.');
    
    // Limpar apenas os dados de agendamento, manter o usuário logado
    localStorage.removeItem('selectedServices');
    localStorage.removeItem('selectedServicesCount');
    localStorage.removeItem('selectedWorkerId');
    localStorage.removeItem('finalSlots');

    window.location.href = '../home_screen/home_screen.html';
});

// Cancelar/Voltar
document.getElementById('btnBackToHome').addEventListener('click', () => {
    window.location.href = '../home_screen/home_screen.html';
});