import { world, missilesInvader, gameState, invaders } from '../state.js';
import MissileInvader from './MissileInvader.js';

export default class Invader {
    constructor(spawnX, spawnY) {
        this.name = "invader" + Date.now() + '_' + Math.floor(Math.random() * 1000000000);
        this.width = 50;
        this.height = 50;
        this.speed = 4;
        this.image = "image/invader.png";
        this.velocity = { x: this.speed, y: 0 };
        this.position = { x: spawnX, y: spawnY };
    }

    draw() {
        const invaderElement = document.getElementById(this.name);
        if (!invaderElement) {
            const createInvader = document.createElement("img");
            createInvader.id = this.name;
            createInvader.src = this.image;
            createInvader.style.width = `${this.width}px`;
            createInvader.style.height = `${this.height}px`;
            createInvader.style.position = "absolute";
            createInvader.style.top = `${this.position.y}px`;
            createInvader.style.left = `${this.position.x}px`;
            world.appendChild(createInvader);
        } else {
            invaderElement.style.top = `${this.position.y}px`;
            invaderElement.style.left = `${this.position.x}px`;
        }
    }

    shoot() {
        const missileInvader = new MissileInvader(this);
        missilesInvader.push(missileInvader);
    }

    update() {
        if (
            this.position.x + this.velocity.x <= 0 ||
            this.position.x + this.width + this.velocity.x >= world.getBoundingClientRect().width - 4
        ) {
            this.velocity.x = -this.velocity.x;
            this.velocity.y = this.height;
        } else {
            this.velocity.y = 0;
        }

        if (this.velocity.y === 0) {
            this.position.x += this.velocity.x;
        } else {
            this.position.y += this.velocity.y;
            if (this.position.x <= 50) {
                this.position.x = 0;
            } else {
                this.position.x = world.getBoundingClientRect().width - this.width - 4;
            }
        }

        const rand = Math.random() * gameState.levelDifficulty;
        if (Math.round(rand) === 1) {
            this.shoot();
        }

        if (this.position.y + this.height > gameState.player.position.y) {
            gameState.gameOver = true;
        }

        this.draw();
    }

    remove(index) {
        const invaderToRemove = document.getElementById(this.name);
        if (invaderToRemove) {
            world.removeChild(invaderToRemove);
        }
        invaders.splice(index, 1);
    }
}