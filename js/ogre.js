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
    
    // Victory condition: all cells are lit
    if (currentGameType === 'panels' && sum === totalCells) {
        setTimeout(() => {
            let board = document.getElementById('board-game');
            board.classList.add('victory');
            board.style.gridTemplateColumns = '1fr';
            board.innerHTML = `
                <div class="victory-message">
                    <h2>¡Mecanismo desbloqueado!</h2>
                    <p>Los engranajes encajan con un chasquido sordo. La pesada puerta cede. <strong>¡La tarta del ogro está a un paso!</strong></p>
                    <button class="btn-game btn-restart" onclick="location.reload()">🔄 Jugar de nuevo</button>
                </div>
            `;
            launchMagicSparks();
        }, 500); 
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