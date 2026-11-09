window.damageAmount = 100;
window.customDefeatTitle = "¡Hielo Quebradizo!";
window.customDefeatText = "Has pisado la baldosa equivocada. La congelación ha sido instantánea...";

function updateBoard() {
    let found = 0;

    for (let i = 0; i < matrixStatus.length; i++) {
        for (let j = 0; j < matrixStatus[i].length; j++) {
            if (matrixStatus[i][j] === 2) {
                found++;
            }
        }
    }

    // Victoria si encuentras las 5 casillas
    if (currentGameType === 'memory' && found === 10) {
        setTimeout(() => {
            let board = document.getElementById('board-game');
            board.classList.add('victory');
            board.style.gridTemplateColumns = '1fr';
            board.innerHTML = `
                <div class="victory-message">
                    <h2>¡Bóveda Superada!</h2>
                    <p>Tu memoria ha evitado que el hielo ceda bajo tus pies.</p>
                    <button class="btn-game btn-restart" onclick="restartGame()">🔄 Jugar de nuevo</button>
                </div>
            `;
            launchMagicSparks();
        }, 500);
    }
}

function launchMagicSparks() {
    for (let i = 0; i < 40; i++) {
        let spark = document.createElement('div');
        spark.className = 'magic-sparks';
        spark.style.backgroundColor = '#ffffff';
        spark.style.boxShadow = '0 0 10px #ffffff, 0 0 20px #cbe6ff';

        spark.style.left = (window.innerWidth / 2 - 200 + Math.random() * 400) + 'px';
        spark.style.top = (window.innerHeight / 2 - 100 + Math.random() * 200) + 'px';
        spark.style.animationDelay = Math.random() * 0.8 + 's';

        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 3000);
    }
}