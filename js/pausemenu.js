export class PauseMenu {
    constructor(game) {
        this.game = game;
        this.continueButton = document.getElementById('continue');
        this.restartButton = document.getElementById('restart');

        this.continueButton.addEventListener('click', () => this.game.resume());
        this.restartButton.addEventListener('click', () => this.game.restart());
    }

    show() {
        this.pauseMenu.classList.remove('hidden');
    }

    hide() {
        this.pauseMenu.classList.add('hidden');
    }
}
