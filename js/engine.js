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
    try {
        let soundClic = new Audio('assets/click1.ogg'); 
        soundClic.play().catch(() => {});
    } catch(error) {}

    if (gameType === 'sandbox') {
        let button = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
        if (button) button.classList.toggle('light-up-cell');
        return; 
    }

    if (gameType === 'panels') {
        moves++;
        
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
                setTimeout(() => {
                    let board = document.getElementById('board-game');
                    board.style.gridTemplateColumns = '1fr';
                    board.classList.add('ocultar-candado');
                    board.innerHTML = `
                        <div class="mensaje-victoria" style="color: #8b0000;">
                            <h2 style="margin-bottom: 5px; color: #8b0000;">¡Has muerto!</h2>
                            <p style="font-size: 1.1em; max-width: 80%; margin: 0 auto;">Las trampas mágicas te han carbonizado por completo. El ogro se ha salido con la suya...</p>
                            <button class="btn-game" style="margin-top: 20px; width: 200px; padding: 10px; font-weight: bold; cursor: pointer; color: black;" onclick="location.reload()">🔄 Jugar de nuevo</button>
                        </div>
                    `;
                }, 400); 
                return;
            }
        }

        matrixStatus[x][y] = matrixStatus[x][y] === 0 ? 1 : 0;
        if (x > 0) matrixStatus[x-1][y] = matrixStatus[x-1][y] === 0 ? 1 : 0;
        if (x < matrixStatus.length - 1) matrixStatus[x+1][y] = matrixStatus[x+1][y] === 0 ? 1 : 0;
        if (y > 0) matrixStatus[x][y-1] = matrixStatus[x][y-1] === 0 ? 1 : 0;
        if (y < matrixStatus[0].length - 1) matrixStatus[x][y+1] = matrixStatus[x][y+1] === 0 ? 1 : 0;

        updateBoard();
    }
}

function updateBoard() {
    let sum = 0;
    let totalCells = matrixStatus.length * matrixStatus[0].length;
    
    for (let i = 0; i < matrixStatus.length; i++) {
        for (let j = 0; j < matrixStatus[i].length; j++) {
            document.querySelector(`[data-x='${i}'][data-y='${j}']`).classList.toggle('light-up-cell', matrixStatus[i][j] === 1);
      
            if (matrixStatus[i][j] === 1) {
                sum++;
            }
        }
    }
    
    // Condición de victoria
    if (currentGameType === 'panels' && sum === totalCells) {
        setTimeout(() => {
            let board = document.getElementById('board-game');
            board.classList.add('ocultar-candado');
            board.style.gridTemplateColumns = '1fr';
            board.innerHTML = `
                <div class="mensaje-victoria">
                    <h2 style="margin-bottom: 5px;">¡Mecanismo Desbloqueado!</h2>
                    <p style="font-size: 1.1em; max-width: 80%; margin: 0 auto;">Los engranajes encajan con un chasquido sordo. La pesada puerta cede. <strong>¡La tarta del ogro está a un paso!</strong></p>
                    <button class="btn-game" style="margin-top: 20px; width: 200px; padding: 10px; font-weight: bold; cursor: pointer; color: black;" onclick="location.reload()">🔄 Jugar de nuevo</button>
                </div>
            `;
            lanzarChispasMagicas();
        }, 500); 
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

function launchMagicSparks() {
    for (let i = 0; i < 40; i++) {
        let spark = document.createElement('div');
        spark.className = 'magic-spark';
        spark.style.left = (window.innerWidth / 2 - 200 + Math.random() * 400) + 'px';
        spark.style.top = (window.innerHeight / 2 - 100 + Math.random() * 200) + 'px';
        spark.style.animationDelay = Math.random() * 0.8 + 's';
        document.body.appendChild(spark);
        
        setTimeout(() => spark.remove(), 3000);
    }
}