let matrixStatus = [];
let currentGameType = '';
let moves = 0;
let life = 100;

function startGame(rows, cols, gameType) {
    document.getElementById('board-game').innerHTML = '';
    matrixStatus = [];
    currentGameType = gameType;
    moves = 0;
    life = 100;
    document.getElementById('bar-life').style.width = '100%';
    document.getElementById('bar-life').style.backgroundColor = '#ff3b3b';
    let portrait = document.getElementById('character-portrait');

    if (portrait) portrait.src = 'assets/normal-face.png';

    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < cols; j++) {
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

    if (gameType === 'memory') {
        let board = document.getElementById('board-game');
        board.style.pointerEvents = 'none';

        let safeCount = 10;
        let rows = matrixStatus.length;
        let cols = matrixStatus[0].length;

        while (safeCount > 0) {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * cols);

            if (matrixStatus[r][c] === 0) {
                matrixStatus[r][c] = 1;

                let cell = document.querySelector(`[data-x='${r}'][data-y='${c}']`);
                cell.classList.add('light-up-cell');
                safeCount--;
            }
        }

        // El temporizador implacable: a los 2 segundos, se apaga la luz
        setTimeout(() => {
            document.querySelectorAll('.btn-game').forEach(btn => {
                btn.classList.remove('light-up-cell');
            });
            board.style.pointerEvents = 'auto'; // Vuelve a permitir clics
        }, 2000);
    }
}

function handleClick(x, y, gameType) {
    try {
        let soundClic = new Audio('assets/audio/click1.ogg');
        soundClic.play().catch(() => { });
    } catch (error) { }

    if (gameType === 'sandbox') {
        let button = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
        if (button) button.classList.toggle('light-up-cell');
        return;
    }

    if (gameType === 'panels') {
        moves++;

        matrixStatus[x][y] = matrixStatus[x][y] === 0 ? 1 : 0;
        if (x > 0) matrixStatus[x - 1][y] = matrixStatus[x - 1][y] === 0 ? 1 : 0;
        if (x < matrixStatus.length - 1) matrixStatus[x + 1][y] = matrixStatus[x + 1][y] === 0 ? 1 : 0;
        if (y > 0) matrixStatus[x][y - 1] = matrixStatus[x][y - 1] === 0 ? 1 : 0;
        if (y < matrixStatus[0].length - 1) matrixStatus[x][y + 1] = matrixStatus[x][y + 1] === 0 ? 1 : 0;

        updateBoard();

        let isSolved = matrixStatus.every(row => row.every(cell => cell === 1));
        if (isSolved) return;

        if (moves > 6) {
            life -= 20;
            if (life < 0) life = 0;

            document.getElementById('bar-life').style.width = life + '%';

            let interfaz = document.getElementById('game-interface');
            interfaz.classList.add('shake-damage');
            setTimeout(() => interfaz.classList.remove('shake-damage'), 400);

            if (life <= 40) {
                document.getElementById('character-portrait').src = 'assets/burnt-face.png';
            }

            // GAME OVER LOGIC
            if (life === 0) {
                triggerDefeat();
            }
        }
    }


    else if (gameType === 'memory') {
        let cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);

        // Si la casilla ya estaba acertada (Estado 2), ignoramos el clic
        if (matrixStatus[x][y] === 2) return;

        if (matrixStatus[x][y] === 1) {
            matrixStatus[x][y] = 2;

            cell.classList.add('light-up-cell');
            updateBoard();

        } else if (matrixStatus[x][y] === 0) {
            life -= window.damageAmount || 100; // Quitamos toda la vida
            if (life < 0) life = 0;
            document.getElementById('bar-life').style.width = life + '%';

            cell.style.backgroundColor = '#4a90e2';

            let interfaz = document.getElementById('game-interface');
            interfaz.classList.add('shake-damage');
            setTimeout(() => interfaz.classList.remove('shake-damage'), 400);

            let portrait = document.getElementById('character-portrait');
            if (document.body.classList.contains('frozen-theme')) {
                portrait.classList.add('avatar-frozen');
            } else {
                portrait.classList.remove('avatar-frozen');
                portrait.src = 'assets/burnt-face.png';
            }

            if (life === 0) {
                triggerDefeat();
            }
        }
    }
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

function triggerDefeat() {
    let board = document.getElementById('board-game');
    board.style.pointerEvents = 'none';

    setTimeout(() => {
        board.style.gridTemplateColumns = '1fr';
        board.classList.add('defeat');
        board.style.pointerEvents = 'auto';

        let titleDefeat = window.customDefeatTitle || "¡Te han pillado!";

        let textDefeat = window.customDefeatText || "Las trampas mágicas te han carbonizado por completo. El ogro se ha salido con la suya..."

        board.innerHTML = `
            <div class="victory-message defeat-message">
                <h2>${titleDefeat}</h2>
                <p>${textDefeat}</p>
                <button class="btn-game btn-restart" onclick="location.reload()">🔄 Jugar de nuevo</button>
            </div>
        `;
    }, 400);
}