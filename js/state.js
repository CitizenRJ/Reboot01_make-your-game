export const world = document.getElementById("GameScreen");

export const keys = {
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowUp: { pressed: false },
    ArrowDown: { pressed: false },
    Enter: { pressed: false },
};

export let invaders = [];
export let missilesPlayer = [];
export let missilesInvader = [];

export const gameState = {
    player: null,
    liveScreen: document.getElementById("live"),
    scoreScreen: document.getElementById("score"),
    timerElement: document.getElementById("timer"),
    fpsIndicator: document.getElementById("fps"),
    levelDifficulty: 1000,
    nextWaveLoadingAnimation: false,
    gameOver: false,
    pauseMenu: false,
    menuSelected: 0,
    frameCount: 0,
    timerSecond: 0,
    timerMinute: 0,
    requestId: null,
};
