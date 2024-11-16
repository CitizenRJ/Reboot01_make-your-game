import { Projectile } from './projectile.js';

export class Player {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = window.innerWidth / 2 - this.width / 2;
        this.y = window.innerHeight - this.height - 10;
        this.speed = 5;
        this.dx = 0;
    }

    update(deltaTime) {
        this.x += this.dx * this.speed;

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > window.innerWidth) this.x = window.innerWidth - this.width;
    }

    draw(renderer) {
        renderer.drawRect(this.x, this.y, this.width, this.height, 'blue');
    }

    moveLeft() {
        this.dx = -1;
    }

    moveRight() {
        this.dx = 1;
    }

    stop() {
        this.dx = 0;
    }

    shoot(game) {
        game.createPlayerProjectile();
    }
}

const playerElement = document.getElementById('player');
let playerPosition = { x: 375, y: 550 }; // Starting position

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && playerPosition.x > 0) {
        playerPosition.x -= 10;
    } else if (e.key === 'ArrowRight' && playerPosition.x < 750) {
        playerPosition.x += 10;
    }
    updatePlayerPosition();
});

function updatePlayerPosition() {
    playerElement.style.left = `${playerPosition.x}px`;
    playerElement.style.bottom = `${playerPosition.y}px`;
}

