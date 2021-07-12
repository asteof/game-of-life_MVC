class LifeModel {
    constructor() {
        this.CELL_AMOUNT = 10;

        this.COLS = this.CELL_AMOUNT;
        this.ROWS = this.CELL_AMOUNT;
        this.grid = 0;
        this.resolution = 0;
    }

    createArray = (cols, rows) => {
        let array = new Array(cols);
        for (let i = 0; i < array.length; i++) {
            array[i] = new Array(rows);
        }
        return array;
    }

    createGrid = () => {
        this.grid = this.createArray(this.COLS, this.ROWS);
        for (let i = 0; i < this.COLS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                this.grid[i][j] = 0; //fills arrays with 0
            }
        }
        this.grid[0][1] = 1;
        this.grid[1][2] = 1;
        this.grid[2][0] = 1;
        this.grid[2][1] = 1;
        this.grid[2][2] = 1;
        console.table(this.grid);
    }

    clearGrid = () => {
        for (let i = 0; i < this.COLS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                this.grid[i][j] = 0; //fills arrays with 0
            }
        }
        // console.table(this.grid)
    }

    randomizeGrid = () => {
        for (let i = 0; i < this.COLS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                this.grid[i][j] = Math.floor(Math.random() > 0.69 ? 1 : 0);
            }
        }
        console.table(this.grid);
    }

    drawGrid = (grid, ctx) => {
        const cellSize = this.resolution / this.CELL_AMOUNT;

        for (let i = 0; i < this.COLS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                let color;
                let strokeColor;
                if (grid[i][j] === 1) {
                    color = '#ffa700';
                    strokeColor = '#222222';
                } else {
                    color = '#222222';
                    strokeColor = '#303030';
                }
                ctx.fillStyle = color;
                ctx.strokeStyle = strokeColor;
                ctx.lineWidth = 2;
                // (j * cellSize) is the X position to draw a rectangle
                // (i * cellSize) is the Y position to draw a rectangle
                // j comes first, because j stands for this.ROWS
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }

    calculateNextGrid = (grid) => {
        let nextGrid = this.createArray(this.COLS, this.ROWS);

        for (let i = 0; i < this.COLS; i++) {
            for (let j = 0; j < this.ROWS; j++) {
                let state = grid[i][j];    //current cell state
                let neighbours = this.countNeighbours(grid, i, j); //8 neighbours of cell in current grid

                if (state === 0 && neighbours === 3) {
                    nextGrid[i][j] = 1;
                } else if (state === 1 && (neighbours < 2 || neighbours > 3)) {
                    nextGrid[i][j] = 0;
                } else {
                    nextGrid[i][j] = state;
                }
                // console.log(`Col: ${i}`, `Row: ${j}`, `State: ${state}`, `Next state:${nextGrid[i][j]}`)
            }
        }
        return nextGrid;
    }

    countNeighbours = (array, x, y) => {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + this.COLS) % this.COLS;
                let row = (y + j + this.ROWS) % this.ROWS;
                sum += array[col][row];
            }
        }
        sum -= array[x][y];
        return sum;
    }
}