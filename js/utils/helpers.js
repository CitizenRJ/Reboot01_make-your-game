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

export function showPauseMenu() {
    gameState.pauseMenu = true;
    gameState.paused = true;

    const pauseMenu = document.createElement('div');
    pauseMenu.id = 'pauseMenu';
    pauseMenu.style.position = 'absolute';
    pauseMenu.style.top = '0';
    pauseMenu.style.left = '0';
    pauseMenu.style.width = '100%';
    pauseMenu.style.height = '100%';
    pauseMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    pauseMenu.style.display = 'flex';
    pauseMenu.style.flexDirection = 'column';
    pauseMenu.style.justifyContent = 'center';
    pauseMenu.style.alignItems = 'center';
    pauseMenu.style.color = '#fff';
    pauseMenu.style.fontSize = '24px';
    pauseMenu.style.zIndex = '1000';

    const continueButton = document.createElement('button');
    continueButton.innerText = 'Continue';
    continueButton.style.margin = '10px';
    continueButton.style.padding = '10px 20px';
    continueButton.style.color = '#ffffff';
    continueButton.style.backgroundColor = '333333';
    continueButton.onclick = () => {
        hidePauseMenu();
    };

    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart';
    restartButton.style.margin = '10px';
    restartButton.style.padding = '10px 20px';
    restartButton.style.color = '#ffffff';
    restartButton.style.backgroundColor = '333333';
    restartButton.onclick = () => {
        location.reload();
    };

    pauseMenu.appendChild(continueButton);
    pauseMenu.appendChild(restartButton);
    world.appendChild(pauseMenu);
}

export function hidePauseMenu() {
    const pauseMenu = document.getElementById('pauseMenu');
    if (pauseMenu) {
        world.removeChild(pauseMenu);
    }
    gameState.pauseMenu = false;
    gameState.paused = false;
}