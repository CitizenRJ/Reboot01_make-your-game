export class InputHandler {
    constructor(player, game) {
        this.player = player;
        this.game = game;

        document.addEventListener('keydown', this.keydown.bind(this));
        document.addEventListener('keyup', this.keyup.bind(this));
    }

    keydown(e) {
        switch (e.key) {
            case 'ArrowLeft':
                this.player.moveLeft();
                break;
            case 'ArrowRight':
                this.player.moveRight();
                break;
            case ' ':
                this.player.shoot(this.game);
                break;
            case 'Escape':
                this.game.togglePause();
                break;
        }
    }

    keyup(e) {
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                this.player.stop();
                break;
        }
    }
}
