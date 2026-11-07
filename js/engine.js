const soundClic = new Audio('assets/clic1.ogg');

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
                soundClic.play();
                handleClick(i, j, gameType)
            });
            document.getElementById('board-game').appendChild(cell);
        }
        matrixStatus.push(row);
    }
    document.getElementById('board-game').style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
}

function handleClick(x, y, gameType) {
    console.log("Clic en la celda: " + x + ", " + y);
}

function toggleMusic() {
    let musica = document.getElementById('background-music');
    let boton = document.getElementById('btn-musica');

    if (musica.paused) {
        musica.play();
        boton.innerText = "🔇 Silenciar";
    } else {
        musica.pause();
        boton.innerText = "🎵 Música";
    }
}