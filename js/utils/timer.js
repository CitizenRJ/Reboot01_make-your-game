import { gameState } from '../state.js';

export function augmenterTemps() {
    if (!gameState.pauseMenu && !gameState.gameOver) {
        const roundedDuration = Math.round(gameState.timerSecond * 100) / 100;
        if (gameState.timerMinute === 0) {
            if (gameState.timerSecond > 1) {
                gameState.timerElement.innerText = `${roundedDuration} seconds since the start of the game`;
            } else {
                gameState.timerElement.innerText = `${roundedDuration} second since the start of the game`;
            }
        } else {
            gameState.timerElement.innerText = 
                `${gameState.timerMinute} minute${gameState.timerMinute > 1 ? 's' : ''} and ` +
                `${roundedDuration} second${roundedDuration > 1 ? 's' : ''} since the start of the game`;
        }

        if (gameState.timerSecond >= 60) {
            gameState.timerSecond = 0;
            gameState.timerMinute++;
        } else {
            gameState.timerSecond += 0.01;
        }
    }
}
