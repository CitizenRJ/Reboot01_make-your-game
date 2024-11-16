export class Projectile {
    constructor(x, y, speed, isPlayerProjectile) {
        this.x = x;
        this.y = y;
        this.width = 3;
        this.height = 10;
        this.speed = speed;
        this.isPlayerProjectile = isPlayerProjectile;
    }

    update() {
        this.y += this.isPlayerProjectile ? -this.speed : this.speed;
    }

    draw(renderer) {
        renderer.drawRect(this.x, this.y, this.width, this.height, this.isPlayerProjectile ? 'green' : 'orange');
    }
}

let projectiles = [];

document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        projectiles.push({ x: playerPosition.x + 20, y: playerPosition.y });
        renderProjectiles();
    }
});

function renderProjectiles() {
    document.querySelectorAll('.projectile').forEach(projectile => projectile.remove());
    projectiles.forEach(projectile => {
        const projectileElement = document.createElement('div');
        projectileElement.classList.add('projectile');
        projectileElement.style.left = `${projectile.x}px`;
        projectileElement.style.top = `${projectile.y}px`;
        gameContainer.appendChild(projectileElement);
    });
}

function moveProjectiles() {
    projectiles = projectiles.map(p => ({ ...p, y: p.y - 10 })).filter(p => p.y > 0);
    renderProjectiles();
}

setInterval(moveProjectiles, 100);

