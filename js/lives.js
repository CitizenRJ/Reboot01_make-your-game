export class Lives {
    constructor(initialLives = 3) {
        this.lives = initialLives;
    }

    loseLife() {
        this.lives--;
        return this.lives <= 0;
    }

    reset(lives = 3) {
        this.lives = lives;
    }

    get current() {
        return this.lives;
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

