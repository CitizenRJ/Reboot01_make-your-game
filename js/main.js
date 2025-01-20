import Player from './classes/Player.js';
import Invader from './classes/Invader.js';
import { augmenterTemps } from './utils/timer.js';
import { deleteAllElements, gameOverScreen } from './utils/helpers.js';
import { world, keys, invaders, missilesPlayer, missilesInvader, gameState } from './state.js';

// Initialize game state
gameState.player = new Player();

// Create initial invaders
for (let i = 0; i <= world.getBoundingClientRect().width / 54; i++) {
    const invader = new Invader(i * 53, 0);
    invaders.push(invader);
}

// FPS counter
setInterval(() => {
    gameState.fpsIndicator.innerHTML = gameState.frameCount + "fps";
    gameState.frameCount = 0;
}, 1000);

// Timer
setInterval(augmenterTemps, 10);

// Game loop
function animationLoop() {
    gameState.requestId = requestAnimationFrame(animationLoop);
    gameState.frameCount++;

    if (gameState.gameOver) {
        gameOverScreen();
        return;
    }

    if (gameState.pauseMenu || gameState.nextWaveLoadingAnimation) return;

    if (gameState.player.lives <= 0) {
        deleteAllElements();
        gameState.gameOver = true;
        return;
    }

    // Update and check collisions for player's missiles
    missilesPlayer.forEach((missilePlayer, missilePlayerIndex) => {
        missilePlayer.update(missilePlayerIndex);

        invaders.forEach((invader, invaderIndex) => {
            // Collision detection between player's missile and invader
            if (
                missilePlayer.position.y <= invader.position.y + invader.height &&
                missilePlayer.position.y + missilePlayer.height >= invader.position.y &&
                missilePlayer.position.x + missilePlayer.width >= invader.position.x &&
                missilePlayer.position.x <= invader.position.x + invader.width
            ) {
                // Remove missile and invader
                missilePlayer.remove(missilePlayerIndex);
                invader.remove(invaderIndex);

                // Update score
                gameState.player.score += 50;
                gameState.scoreScreen.innerHTML = "Scores: " + gameState.player.score;
            }
        });
    });

    // Update and check collisions for invaders' missiles
    missilesInvader.forEach((missileInvader, missileInvaderIndex) => {
        missileInvader.update(missileInvaderIndex);

        const player = gameState.player;
        // Collision detection between invader's missile and player
        if (
            missileInvader.position.y + missileInvader.height >= player.position.y &&
            missileInvader.position.y <= player.position.y + player.height &&
            missileInvader.position.x + missileInvader.width >= player.position.x &&
            missileInvader.position.x <= player.position.x + player.width
        ) {
            // Remove missile
            missileInvader.remove(missileInvaderIndex);

            // Reduce player's lives
            player.lives -= 1;
            gameState.liveScreen.innerHTML = "Lives: " + player.lives;

            // Check for game over
            if (player.lives <= 0) {
                deleteAllElements();
                gameState.gameOver = true;
                return;
            }
        }
    });

    // Update invaders
    invaders.forEach((invader, index) => {
        invader.update(index);
    });

    // Update player
    gameState.player.update();

    // Check for next wave
    if (invaders.length === 0 && !gameState.nextWaveLoadingAnimation) {
        gameState.player.nextWave();
    }
}

animationLoop();

// Event listeners
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            break;
        case 'Enter':
            keys.Enter.pressed = true;
            break;
        case 'Escape':
            gameState.pauseMenu = true;
            break;
        case ' ':
            gameState.player.shoot();
            break;
    }
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break;
        case 'Enter':
            keys.Enter.pressed = false;
            break;
    }
});
