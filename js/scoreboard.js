import { Lives } from './lives.js';
import { Timer } from './timer.js';

export class Scoreboard {
    constructor() {
        this.score = 0;
        this.lives = new Lives();
        this.timer = new Timer();
        this.timerElement = document.getElementById('timer');
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
    }

    update() {
        this.updateDisplay();
    }

    updateDisplay() {
        this.timerElement.textContent = `Time: ${Math.floor(this.timer.getTime() / 1000)}`;
        this.scoreElement.textContent = `Score: ${this.score}`;
        this.livesElement.textContent = `Lives: ${this.lives.current}`;
    }

    addScore(points) {
        this.score += points;
        this.updateDisplay();
    }

    loseLife() {
        const gameOver = this.lives.loseLife();
        this.updateDisplay();
        return gameOver;
    }

    reset() {
        this.score = 0;
        this.lives.reset();
        this.timer.reset();
        this.updateDisplay();
    }
}

let score = 0;
let lives = 3;

function updateScore() {
    document.getElementById('scoreboard').textContent = `Score: ${score}`;
}

function updateLives() {
    document.getElementById('lives').textContent = `Lives: ${lives}`;
}

// Call these whenever needed, e.g., after a collision
updateScore();
updateLives();

