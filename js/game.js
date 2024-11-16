import { CollisionDetector } from './collision.js';
import { Enemy } from './enemy.js';
import { InputHandler } from './inputHandler.js';
import { Lives } from './lives.js';
import { PauseMenu } from './pauseMenu.js';
import { Player } from './player.js';
import { Projectile, moveProjectiles } from './projectile.js';
import { Renderer } from './renderer.js';
import { Scoreboard } from './scoreboard.js';
import { Timer } from './timer.js';

class Game {
    constructor() {
        this.renderer = new Renderer();
        this.player = new Player();
        this.enemies = this.createEnemies();
        this.scoreboard = new Scoreboard();
        this.pauseMenu = new PauseMenu(this);
        this.inputHandler = new InputHandler(this.player, this);
        this.isRunning = false;
        this.isPaused = false;
        this.lastTime = 0;
        this.playerProjectiles = [];
        this.enemyProjectiles = [];
        this.lives = new Lives();
        this.timer = new Timer();
    }

    createEnemies() {
        const enemies = [];
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 10; x++) {
                const type = y === 2 ? 'zigzag' : 'normal';
                enemies.push(new Enemy(x * 60 + 50, y * 60 + 50, type));
            }
        }
        return enemies;
    }


    start() {
        this.isRunning = true;
        this.timer.start();
        this.animate(0);
    }

    animate(currentTime) {
        if (!this.isRunning || this.isPaused) return;

        requestAnimationFrame(this.animate.bind(this));

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();
    }

    update(deltaTime) {
        this.player.update(deltaTime);
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);
            if (Math.random() < 0.001) {  // Adjust this value to change shooting frequency
                this.createEnemyProjectile(enemy);
            }
        });
        this.playerProjectiles = this.playerProjectiles.filter(projectile => projectile.isActive());
        this.enemyProjectiles = this.enemyProjectiles.filter(projectile => projectile.isActive());
        this.playerProjectiles.forEach(projectile => projectile.update(deltaTime));
        this.enemyProjectiles.forEach(projectile => projectile.update(deltaTime));
        this.scoreboard.update(deltaTime);
        this.checkCollisions();
        this.checkGameOver();
        this.checkWinCondition();
    }

    render() {
        this.renderer.clear();
        this.player.draw(this.renderer);
        this.enemies.forEach(enemy => enemy.draw(this.renderer));
        this.playerProjectiles.forEach(projectile => projectile.draw(this.renderer));
        this.enemyProjectiles.forEach(projectile => projectile.draw(this.renderer));
        this.scoreboard.draw(this.renderer);
    }

    checkCollisions() {
        const enemyCollisions = CollisionDetector.checkProjectileEnemyCollisions(this.playerProjectiles, this.enemies);
        enemyCollisions.forEach(({ projectileIndex, enemyIndex }) => {
            this.destroyEnemy(this.enemies[enemyIndex]);
            this.playerProjectiles.splice(projectileIndex, 1);
        });

        const playerCollisionIndex = CollisionDetector.checkProjectilePlayerCollision(this.enemyProjectiles, this.player);
        if (playerCollisionIndex !== -1) {
            const gameOver = this.scoreboard.loseLife();
            this.enemyProjectiles.splice(playerCollisionIndex, 1);
            if (gameOver) {
                this.endGame();
            }
        }
    }

    destroyEnemy(enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1);
        }
        this.scoreboard.addScore(10);
    }

    checkGameOver() {
        if (this.lives.current <= 0 || this.enemies.some(enemy => enemy.y + enemy.height >= this.player.y)) {
            this.endGame(false);
        }
    }

    checkWinCondition() {
        if (this.enemies.length === 0) {
            this.endGame(true);
        }
    }

    endGame(isWin) {
        this.isRunning = false;
        this.timer.stop();
        if (isWin) {
            this.displayWinMessage();
        } else {
            this.displayGameOverMessage();
        }
    }

    displayGameOverMessage() {
        this.displayMessage('Game Over!');
    }

    displayWinMessage() {
        this.displayMessage('Congratulations! You won!');
    }

    displayMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.id = 'game-message';
        messageElement.textContent = text;
        messageElement.style.position = 'absolute';
        messageElement.style.top = '50%';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translate(-50%, -50%)';
        messageElement.style.fontSize = '24px';
        messageElement.style.color = 'white';
        document.body.appendChild(messageElement);
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.pauseMenu.show();
            this.timer.stop();
        } else {
            this.resume();
        }
    }

    resume() {
        this.isPaused = false;
        this.pauseMenu.hide();
        this.timer.start();
    }

    restart() {
        this.player = new Player();
        this.enemies = this.createEnemies();
        this.scoreboard = new Scoreboard();
        this.playerProjectiles = [];
        this.enemyProjectiles = [];
        this.isPaused = false;
        this.pauseMenu.hide();
        this.lives.reset();
        this.timer.reset();
        this.timer.start();
        const messageElement = document.getElementById('game-message');
        if (messageElement) {
            messageElement.remove();
        }
        this.isRunning = true;
        this.lastTime = 0;
        this.animate(0);
    }

    createPlayerProjectile() {
        const projectile = new Projectile(
            this.player.x + this.player.width / 2,
            this.player.y,
            10,
            true
        );
        this.playerProjectiles.push(projectile);
    }

    createEnemyProjectile(enemy) {
        const projectile = new Projectile(
            enemy.x + enemy.width / 2,
            enemy.y + enemy.height,
            5,
            false
        );
        this.enemyProjectiles.push(projectile);
    }
}

const game = new Game();
game.start();

function gameLoop() {
    // Update all game elements
    renderEnemies();
    moveProjectiles();
    checkCollisions();
    checkGameOver();
}

// Run the game loop at a set interval
setInterval(gameLoop, 50);

