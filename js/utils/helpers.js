import { world, missilesPlayer, missilesInvader, invaders, gameState, keys } from '../state.js';

export function deleteAllElements() {
    while (world.firstChild) {
        world.removeChild(world.firstChild);
    }
    invaders.length = 0;
    missilesPlayer.length = 0;
    missilesInvader.length = 0;
}

export function gameOverScreen() {
    if (gameState.gameOver) {
        let endImage = document.getElementById("end");
        let menu = document.getElementById("menu");
        if (!endImage) {
            let createMenu = document.createElement("pre");
            createMenu.id = "menu";
            createMenu.style.textAlign = "center";
            createMenu.style.fontFamily = "serif";
            createMenu.style.fontSize = "18px";
            createMenu.style.color = "white";
            createMenu.innerHTML = `You lost!\nThe world has been destroyed by invaders!\n\n➤ restart`;
            world.appendChild(createMenu);

            let createEndImage = document.createElement("img");
            createEndImage.src = "image/end.gif";
            createEndImage.id = "end";
            createEndImage.style.width = `${world.getBoundingClientRect().width - 4}px`;
            createEndImage.style.height = `${world.getBoundingClientRect().height - menu.offsetHeight - 4}px`;
            world.appendChild(createEndImage);
        } else {
            endImage.style.width = `${world.getBoundingClientRect().width - 4}px`;
            endImage.style.height = `${world.getBoundingClientRect().height - menu.offsetHeight - 4}px`;
        }

        if (keys.Enter.pressed) {
            location.reload();
        }
    }
}
