import { Board } from '../../packages/board.js';

const board = new Board();
const container = document.getElementById('boardContainer');
const btnConfirm = document.getElementById('btnConfirm');

let selectedSlot = null; // { day, time, element }

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
    if (selectedSlot) {
        selectedSlot.element.classList.remove('selected');
        selectedSlot.element.innerText = 'Livre';
    }

    selectedSlot = { day, time: hour, element };
    element.classList.add('selected');
    element.innerText = 'Selecionado';
    btnConfirm.disabled = false;
}

btnConfirm.addEventListener('click', () => {
    if (selectedSlot) {
        alert(`Agendamento confirmado para ${selectedSlot.day} às ${selectedSlot.time}`);
        // Futuro: Salvar via classes e Banco de Dados
    }
});

renderBoard();