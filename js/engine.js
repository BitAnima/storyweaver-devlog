function startGame(rows, cols, gameType) {
    document.getElementById('board-game').innerHTML = '';
    let matrixStatus = [];

    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j< cols; j++) {
            row.push(0); 
            let cell = document.createElement('button');
            cell.classList.add('btn-game');
            cell.dataset.x = i;
            cell.dataset.y = j;
            cell.addEventListener('click', () => {
                handleClick(i, j, gameType);
            });
            document.getElementById('board-game').appendChild(cell);
        }
        matrixStatus.push(row);
    }
    document.getElementById('board-game').style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
}

function handleClick(x, y, gameType) {
    let button = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
    if (button) {
        button.classList.toggle('light-up-cell');
    }

    try {
        let soundClic = new Audio('assets/click1.ogg'); 
        soundClic.play().catch(() => {});
    } catch(error) {}
}

function toggleMusic() {
    let music = document.getElementById('background-music');
    let boton = document.getElementById('btn-music');

    if (music.paused) {
        music.play();
        boton.innerText = "🔇 Silenciar";
    } else {
        music.pause();
        boton.innerText = "🎵 Música";
    }
}