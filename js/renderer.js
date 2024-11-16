export class Renderer {
    constructor() {
        this.gameContainer = document.getElementById('game-container');
    }

    clear() {
        this.gameContainer.innerHTML = ''; // Clear all elements
    }

    drawRect(x, y, width, height, color, id = '') {
        let element = document.getElementById(id);

        if (!element) {
            element = document.createElement('div');
            element.style.position = 'absolute';
            if (id) element.id = id;
            this.gameContainer.appendChild(element);
        }

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        element.style.backgroundColor = color;
    }
}

