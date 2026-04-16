document.getElementById('btnNext').addEventListener('click', () => {
    // Busca qual botão de rádio (serviço) está selecionado
    const selectedService = document.querySelector('input[name="service"]:checked');
    
    if (selectedService) {
        alert(`Serviço selecionado: ${selectedService.value}\nLógica de próxima tela virá aqui.`);
        // Exemplo futuro: window.location.href = '../appointment/appointment.html';
    } else {
        alert('Por favor, selecione um serviço antes de clicar em Next.');
    }
});