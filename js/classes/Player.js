import { world, keys, missilesPlayer, gameState, invaders } from '../state.js';
import MissilePlayer from './MissilePlayer.js';
import Invader from './Invader.js';
import { deleteAllElements } from '../utils/helpers.js';

export default class Player {
    constructor() {
        this.name = "player";
        this.width = 100;
        this.height = 100;
        this.speed = 10;
        this.lives = 3;
        this.shootCapacity = 1;
        this.score = 0;
        this.level = 1;
        this.image = "image/player.png";
        this.velocity = { x: 0, y: 0 };
        this.position = {
            x: (world.getBoundingClientRect().width - this.width) / 2,
            y: world.getBoundingClientRect().height - this.height - 4,
        };
    }

    draw() {
        const playerElement = document.getElementById(this.name);
        if (!playerElement) {
            const createPlayer = document.createElement("img");
            createPlayer.id = this.name;
            createPlayer.src = this.image;
            createPlayer.style.width = `${this.width}px`;
            createPlayer.style.height = `${this.height}px`;
            createPlayer.style.position = "absolute";
            createPlayer.style.top = `${this.position.y}px`;
            createPlayer.style.left = `${this.position.x}px`;
            world.appendChild(createPlayer);
        } else {
            playerElement.style.top = `${this.position.y}px`;
            playerElement.style.left = `${this.position.x}px`;
        }
    }

    shoot() {
        if (missilesPlayer.length < this.shootCapacity) {
            const missile = new MissilePlayer(this);
            missilesPlayer.push(missile);
        }
    }

    update() {
        if (keys.ArrowLeft.pressed && this.position.x >= 10) {
            this.velocity.x = -this.speed;
        } else if (keys.ArrowRight.pressed && this.position.x + this.width <= world.getBoundingClientRect().width - 13) {
            this.velocity.x = this.speed;
        } else {
            this.velocity.x = 0;
        }

        this.position.x += this.velocity.x;
        this.position.y = world.getBoundingClientRect().height - this.height - 4;
        this.draw();
    }

    nextWave() {
        deleteAllElements();

        this.level++;
        if (this.shootCapacity < 5) {
            this.shootCapacity++;
        }

        const levelElement = document.getElementById("level");
        levelElement.innerHTML = "Level : " + this.level;

        gameState.nextWaveLoadingAnimation = true;

        const messageAlert = document.createElement("h2");
        messageAlert.textContent = "New Wave Is Coming !!!";
        messageAlert.id = "messageAlert";
        messageAlert.style.backgroundColor = `rgba(255, 0, 0, 1)`;
        messageAlert.style.color = "black";
        messageAlert.style.fontFamily = "serif";
        messageAlert.style.fontSize = "22px";
        messageAlert.style.textAlign = "center";
        messageAlert.style.width = `${world.getBoundingClientRect().width}px`;
        messageAlert.style.height = `${world.getBoundingClientRect().height}px`;

        world.appendChild(messageAlert);

        const startTime = Date.now();
        let opacity = 1;

        const nextWaveAnimation = () => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime <= 4000) {
                requestAnimationFrame(nextWaveAnimation);

                if (elapsedTime <= 1000 || (elapsedTime > 2000 && elapsedTime <= 3000)) {
                    opacity -= 0.015;
                } else {
                    opacity += 0.015;
                }

                messageAlert.style.background = `rgba(255, 0, 0, ${opacity})`;
            } else {
                world.removeChild(messageAlert);
                gameState.nextWaveLoadingAnimation = false;

                for (let i = 0; i <= world.getBoundingClientRect().width / 54; i++) {
                    const invader = new Invader(i * 53, 0);
                    invader.velocity.x += this.level;
                    invaders.push(invader);
                }
                if (gameState.levelDifficulty >= 5) {
                    gameState.levelDifficulty /= 1.25;
                }
            }
        };

        nextWaveAnimation();
    }
}
