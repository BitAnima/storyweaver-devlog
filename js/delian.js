// Configuración específica de Delian
window.customDefeatTitle = "¡El guardián despierta!";
window.customDefeatText = "Has canalizado mal el maná. La tumba tiembla y los espectros de los caballeros de Delian se alzan de sus sarcófagos...";

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
                    <h2>¡Sello descifrado!</h2>
                    <p>Los 16 nodos resuenan en perfecta armonía élfica. La pesada pared de piedra se desvanece, revelando los oscuros secretos de la orden.</p>
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
        /* Chispas místicas élficas */
        spark.style.backgroundColor = '#00ffff';
        spark.style.boxShadow = '0 0 10px #00ffff, 0 0 20px #fff';
        spark.style.left = (window.innerWidth / 2 - 200 + Math.random() * 400) + 'px';
        spark.style.top = (window.innerHeight / 2 - 100 + Math.random() * 200) + 'px';
        spark.style.animationDelay = Math.random() * 0.8 + 's';
        document.body.appendChild(spark);

        setTimeout(() => spark.remove(), 3000);
    }
}