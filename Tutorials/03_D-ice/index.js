// Función para lanzar los dados
function rollDice() {
    // Genera números aleatorios para ambos dados
    const randomNumber1 = Math.floor(Math.random() * 6) + 1; // 1-6
    const randomNumber2 = Math.floor(Math.random() * 6) + 1; // 1-6

    // Actualiza las imágenes de los dados
    document.getElementById("dice1").src = `images/dice${randomNumber1}.png`;
    document.getElementById("dice2").src = `images/dice${randomNumber2}.png`;

    // Cambia el texto del ganador
    const winnerText = document.getElementById("winnerText");
    if (randomNumber1 > randomNumber2) {
        winnerText.textContent = "Player 1 Wins!";
    } else if (randomNumber1 < randomNumber2) {
        winnerText.textContent = "Player 2 Wins!";
    } else {
        winnerText.textContent = "It's a Tie!";
    }
}
