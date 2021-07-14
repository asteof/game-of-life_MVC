import LifeModel from "./lifeModel.js";
import LifeView from "./lifeView.js";

class LifeController {
    constructor() {
        this.model = new LifeModel();
        this.view = new LifeView();

        this.epoch = 0;
        this.intervalDelay = 600;
        this.gameIsRunning = null; //variable used as interval for easy setting and clearing
        this.isDrawing = false; //variable for continuous drawing
        this.prevX = 0;
        this.prevY = 0;
    }

    resizeCanvas = () => {
        const container = this.view.CANVAS_CONTAINER

        const w = container.offsetWidth;
        const h = container.offsetHeight;
        let fieldDimension;
        if (w > h) {
            fieldDimension = h * 0.92;
        } else {
            fieldDimension = w * 0.92;
        }
        this.view.CANVAS.height = fieldDimension;
        this.view.CANVAS.width = fieldDimension;
        this.model.resolution = fieldDimension;
        this.model.drawGrid(this.model.grid, this.view.ctx);
    }

    epochChange = () => {
        this.model.drawGrid(this.model.grid, this.view.ctx);
        let nextGrid = this.model.calculateNextGrid(this.model.grid);

        if (this.model.grid.toString() !== nextGrid.toString()) {
            this.model.grid = nextGrid;
            this.epoch++;
        } else {
            this.stopGame();
            this.view.GAME_OVER_LABEL.style.display = 'flex';
        }
        this.view.EPOCH_COUNTER.textContent = this.epoch.toString();
    }

    stopGame = () => {
        clearInterval(this.gameIsRunning);
        this.gameIsRunning = null;
    }

    resetGame = () => {
        this.stopGame();
        this.epoch = 0;
        this.model.clearGrid();
        this.model.drawGrid(this.model.grid, this.view.ctx);
        this.view.EPOCH_COUNTER.textContent = this.epoch.toString();
        this.view.START_BTN.textContent = 'Start';
        this.view.GAME_OVER_LABEL.style.display = 'none';
    }


    canvasClickHandler = (e) => {
        console.log(this.isDrawing)
        this.view.GAME_OVER_LABEL.style.display = 'none'
        let rect = this.view.CANVAS.getBoundingClientRect()
        let x = Math.floor((e.clientX - rect.left) * this.model.CELL_AMOUNT / this.model.resolution);
        let y = Math.floor((e.clientY - rect.top) * this.model.CELL_AMOUNT / this.model.resolution);

        console.log(x, y, this.model.resolution, rect)
        console.log(this.model.grid[y][x])

        if (this.model.grid[y][x] === 1) {
            this.model.grid[y][x] = 0;
            console.log(`x: ${x} y: ${y}\ngrid[${x}][${y}]: ${this.model.grid[x][y]} -> 0`);
        } else if (this.model.grid[y][x] === 0) {
            this.model.grid[y][x] = 1;
            console.log(`x: ${x} y: ${y}\ngrid[${x}][${y}]: ${this.model.grid[x][y]} -> 1`);
        }

        this.prevX = x;
        this.prevY = y;
        this.model.drawGrid(this.model.grid, this.view.ctx);
        console.log(this.model.grid[y][x])
    }

    startDrawing = (e) => {
        this.canvasClickHandler(e);
        if (!this.isDrawing)
            this.isDrawing = true;
    }

    finishDrawing = () => {
        if (this.isDrawing)
            this.isDrawing = false;
    }

    canvasDrawHandler = (e) => {
        if (this.isDrawing) {
            this.view.GAME_OVER_LABEL.style.display = 'none'
            let rect = this.view.CANVAS.getBoundingClientRect()
            let x = Math.floor((e.clientX - rect.left) * this.model.CELL_AMOUNT / this.model.resolution);
            let y = Math.floor((e.clientY - rect.top) * this.model.CELL_AMOUNT / this.model.resolution);

            if (this.prevX !== x || this.prevY !== y) {

                console.log(x, y)
                if (this.model.grid[y][x] === 1) {
                    this.model.grid[y][x] = 0;
                } else if (this.model.grid[y][x] === 0) {
                    this.model.grid[y][x] = 1;
                }
            }
            this.prevX = x;
            this.prevY = y;
            this.model.drawGrid(this.model.grid, this.view.ctx);
        }
    }

    startBtnHandler = () => {
        this.view.GAME_OVER_LABEL.style.display = 'none'
        if (this.gameIsRunning === null) {
            this.gameIsRunning = setInterval(this.epochChange, this.intervalDelay);
        }
        this.view.START_BTN.textContent = 'Start';
    }

    stopBtnHandler = () => {
        if (this.gameIsRunning !== null) {
            this.stopGame();
            this.view.START_BTN.textContent = 'Resume';
        }
    }

    clearBtnHandler = () => {
        this.resetGame();
    }

    randomBtnHandler = () => {
        this.resetGame();
        this.model.randomizeGrid();
        this.model.drawGrid(this.model.grid, this.view.ctx);
    }

    defaultBtnHandler = () => {
        this.resetGame();
        this.model.createGrid()
        this.model.drawGrid(this.model.grid, this.view.ctx);
    }

    initialize() {
        this.model.createGrid();
        this.resizeCanvas();
    }
}

const gameOfLife = new LifeController();

window.addEventListener('resize', gameOfLife.resizeCanvas);
window.addEventListener('mouseup', gameOfLife.finishDrawing);

gameOfLife.view.CANVAS.addEventListener('mousedown', gameOfLife.startDrawing);
gameOfLife.view.CANVAS.addEventListener('mouseup', gameOfLife.finishDrawing);
gameOfLife.view.CANVAS.addEventListener('mousemove', gameOfLife.canvasDrawHandler);

gameOfLife.view.START_BTN.addEventListener('click', gameOfLife.startBtnHandler);

gameOfLife.view.STOP_BTN.addEventListener('click', gameOfLife.stopBtnHandler);

gameOfLife.view.CLEAR_BTN.addEventListener('click', gameOfLife.clearBtnHandler);

gameOfLife.view.RANDOM_BTN.addEventListener('click', gameOfLife.randomBtnHandler);

gameOfLife.view.DEFAULT_BTN.addEventListener('click', gameOfLife.defaultBtnHandler);

gameOfLife.view.SLIDER.addEventListener('input', () => {
    gameOfLife.intervalDelay = Math.floor(gameOfLife.view.SLIDER.value);
    if (gameOfLife.gameIsRunning !== null) {
        clearInterval(gameOfLife.gameIsRunning);
        gameOfLife.gameIsRunning = setInterval(gameOfLife.epochChange, gameOfLife.intervalDelay);
    }
    gameOfLife.view.SPEEDOMETER.textContent = gameOfLife.intervalDelay.toString() + 'ms';
})

gameOfLife.initialize();