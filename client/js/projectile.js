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
        renderer.drawRect(this.x, this.y, this.width, this.height, this.isPlayerProjectile ? 'green' : 'yellow');
    }
}