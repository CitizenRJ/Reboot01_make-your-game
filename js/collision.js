export class CollisionDetector {
    static checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }

    static checkProjectileEnemyCollisions(projectiles, enemies) {
        let collisions = [];
        projectiles.forEach((projectile, pIndex) => {
            enemies.forEach((enemy, eIndex) => {
                if (this.checkCollision(projectile, enemy)) {
                    collisions.push({ projectileIndex: pIndex, enemyIndex: eIndex });
                }
            });
        });
        return collisions;
    }

    static checkProjectilePlayerCollision(projectiles, player) {
        return projectiles.findIndex(projectile => this.checkCollision(projectile, player));
    }
}