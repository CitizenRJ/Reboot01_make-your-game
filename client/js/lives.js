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
