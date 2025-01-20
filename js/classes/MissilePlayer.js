import { world, missilesPlayer } from '../state.js';

export default class MissilePlayer {
    constructor(owner) {
        this.name = "missilePlayer" + Date.now() + '_' + Math.floor(Math.random() * 1000000000);
        this.width = 15;
        this.height = 35;
        this.speed = -20;
        this.image = "image/playerMissile.png";
        this.velocity = { x: 0, y: 0 };
        this.position = {
            x: owner.position.x + owner.width/2 - this.width/2,
            y: owner.position.y + 30,
        };
    }

    draw() {
        const missileElement = document.getElementById(this.name);
        if (!missileElement) {
            const createMissile = document.createElement("img");
            createMissile.id = this.name;
            createMissile.src = this.image;
            createMissile.style.width = `${this.width}px`;
            createMissile.style.height = `${this.height}px`;
            createMissile.style.position = "absolute";
            createMissile.style.top = `${this.position.y}px`;
            createMissile.style.left = `${this.position.x}px`;
            world.appendChild(createMissile);
        } else {
            missileElement.style.top = `${this.position.y}px`;
            missileElement.style.left = `${this.position.x}px`;
        }
    }

    update(index) {
        if (this.position.y > 0) {
            this.velocity.y = this.speed;
            this.position.y += this.velocity.y;
            this.draw();
        } else {
            this.remove(index);
        }
    }

    remove(index) {
        const missileToRemove = document.getElementById(this.name);
        if (missileToRemove) {
            world.removeChild(missileToRemove);
        }
        missilesPlayer.splice(index, 1);
    }
}