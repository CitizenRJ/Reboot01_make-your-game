export class Renderer {
    constructor() {
        this.gameArea = document.getElementById('game-area');
        this.context = this.gameArea.getContext('2d');
        this.setCanvasSize();
        window.addEventListener('resize', () => this.setCanvasSize());
    }

    setCanvasSize() {
        this.gameArea.width = window.innerWidth;
        this.gameArea.height = window.innerHeight;
    }

    clear() {
        this.context.clearRect(0, 0, this.gameArea.width, this.gameArea.height);
    }

    drawRect(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    // Add more drawing methods as needed
}
