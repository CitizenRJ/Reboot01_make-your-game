export class Enemy {
    constructor(x, y, type = 'normal') {
        this.width = 40;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.direction = 1;
        this.moveDown = false;
        this.type = type;
        this.sinOffset = Math.random() * Math.PI * 2;
    }

    update(deltaTime, gameWidth) {
        const movement = this.speed * this.direction * (deltaTime / 16);
        if (this.moveDown) {
            this.y += this.height;
            this.direction *= -1;
            this.moveDown = false;
        } else {
            this.x += movement;

            if (this.type === 'zigzag') {
                this.y += Math.sin(this.x / 50 + this.sinOffset) * 0.5 * (deltaTime / 16);
            }
        }

        if (this.x <= 0 || this.x + this.width >= gameWidth) {
            this.moveDown = true;
        }
    }


    draw(renderer) {
        const color = this.type === 'zigzag' ? 'purple' : 'red';
        renderer.drawRect(this.x, this.y, this.width, this.height, color);
    }

    shoot(game) {
        if (Math.random() < 0.001) {
            game.createEnemyProjectile(this);
        }
    }
}
