import { Board } from '../../packages/board.js';

const board = new Board();
const container = document.getElementById('boardContainer');
const btnConfirm = document.getElementById('btnConfirm');

// Pega a quantidade de horários necessários baseada nos serviços que vieram da Home
const maxSlots = parseInt(localStorage.getItem('selectedServicesCount')) || 1;
let selectedSlots = []; // Array of { day, time, element }

// Atualiza o título do header para avisar ao usuário quantos horários ele precisa escolher
const headerTitle = document.querySelector('.header h2');
if (headerTitle) {
    headerTitle.innerText = `Selecione ${maxSlots} horário(s)`;
}

// Botão de voltar
document.getElementById('btnBack').addEventListener('click', () => {
    window.location.href = '../home_screen/home_screen.html';
});

// Renderizar o quadro
function renderBoard() {
    container.innerHTML = '';

    // Canto superior esquerdo vazio
    const emptyCorner = document.createElement('div');
    emptyCorner.className = 'cell header-cell';
    container.appendChild(emptyCorner);

    // Cabeçalho dos dias
    board.days.forEach(day => {
        const div = document.createElement('div');
        div.className = 'cell header-cell';
        div.innerText = day;
        container.appendChild(div);
    });

    // Linhas de horas
    board.hours.forEach(hour => {
        // Coluna da hora
        const timeDiv = document.createElement('div');
        timeDiv.className = 'cell time-cell';
        timeDiv.innerText = hour;
        container.appendChild(timeDiv);

        // Slots dos dias para esta hora
        board.days.forEach(day => {
            const status = board.schedule[day][hour];
            const slot = document.createElement('div');
            slot.className = `cell slot ${status}`;
            slot.innerText = status === 'free' ? 'Livre' : 'Ocupado';

            if (status === 'free') {
                slot.addEventListener('click', () => selectSlot(slot, day, hour));
            }

            container.appendChild(slot);
        });
    });
}

function selectSlot(element, day, hour) {
    // Verifica se o slot clicado já está selecionado
    const index = selectedSlots.findIndex(slot => slot.day === day && slot.time === hour);

    if (index > -1) {
        // Se já estava selecionado, desmarca
        selectedSlots[index].element.classList.remove('selected');
        selectedSlots[index].element.innerText = 'Livre';
        selectedSlots.splice(index, 1);
    } else {
        // Se não estava selecionado, verifica o limite máximo e marca
        if (selectedSlots.length >= maxSlots) {
            alert(`Você deve selecionar exatamente ${maxSlots} horário(s) para os serviços escolhidos.`);
            return;
        }
        selectedSlots.push({ day, time: hour, element });
        element.classList.add('selected');
        element.innerText = 'Selecionado';
    }

    // Libera o botão APENAS se a quantidade de slots marcados for igual ao que foi pedido
    btnConfirm.disabled = selectedSlots.length !== maxSlots;
}

btnConfirm.addEventListener('click', () => {
    if (selectedSlots.length === maxSlots) {
        // Salva os horários no localStorage para usar na tela de confirmação
        localStorage.setItem('finalSlots', JSON.stringify(selectedSlots));
        // Redireciona para a tela de confirmação
        window.location.href = '../confirm_screen/confirm.html';
    }
});

renderBoard();