const workerListContainer = document.getElementById('workerList');

// Saudação usando o nome salvo no login (se houver)
const storedName = localStorage.getItem('userName');
if (storedName) {
    document.getElementById('greeting').innerText = `Hello, ${storedName}`;
}

// Carregar especialistas do banco ao iniciar a tela
async function loadWorkers() {
    try {
        const response = await fetch('http://localhost:3000/api/workers');
        const workers = await response.json();
        
        workerListContainer.innerHTML = `
            <label class="service-option">
                <input type="radio" name="worker" value="any" checked>
                <div>
                    <strong>Qualquer Especialista</strong>
                    <div style="font-size: 12px; color: #666;">Ver todos os horários</div>
                </div>
            </label>
        `;

        workers.forEach(worker => {
            const specs = worker.specialties.join(', ');
            workerListContainer.innerHTML += `
                <label class="service-option">
                    <input type="radio" name="worker" value="${worker._id}">
                    <div>
                        <strong>${worker.name}</strong>
                        <div style="font-size: 12px; color: #666;">${specs}</div>
                    </div>
                </label>
            `;
        });
    } catch (error) {
        workerListContainer.innerHTML = '<p style="color: red;">Erro ao carregar especialistas.</p>';
    }
}

// Botão NEXT
document.getElementById('btnNext').addEventListener('click', () => {
    // Pega TODOS os serviços marcados
    const selectedServiceCheckboxes = document.querySelectorAll('input[name="service"]:checked');
    const selectedWorker = document.querySelector('input[name="worker"]:checked');
    
    if (selectedServiceCheckboxes.length === 0) {
        alert('Por favor, selecione pelo menos um serviço.');
        return;
    }

    if (!selectedWorker) {
        alert('Por favor, selecione um especialista ou a opção "Qualquer Especialista".');
        return;
    }

    const selectedServices = Array.from(selectedServiceCheckboxes).map(cb => cb.value);

    // Salva as escolhas para usar na tela do quadro de horários
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    localStorage.setItem('selectedServicesCount', selectedServices.length);
    localStorage.setItem('selectedWorkerId', selectedWorker.value);

    window.location.href = '../appointment/appointment.html';
});

loadWorkers();