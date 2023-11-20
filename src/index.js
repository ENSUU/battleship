class Ship {
    constructor(length, startCoord, direction) {
        this.length = length; 
        this.hitCount = 0; 
        this.sunkStatus = false; 
        this.coords = [startCoord];
        this.direction = direction; 
        this.populateCoords();
    }

    hit() {
        this.hitCount += 1;
        if (this.hitCount === this.length) {
            this.sunkStatus = true; 
        }; 
    }

    isSunk() {
        return this.sunkStatus; 
    }

    populateCoords() {
        // If the length of the ship is 1, it occupies only one cell. The starting coordinate is the ship's only coordinate. 
        if (this.length < 2) return; 

        // Depending on the direction specified, the ship's offset will either increment or decrement the x or y coordinate. 
        const offsets = [[0, 1], [-1, 0], [1, 0], [0, -1]]; 

        // Determining the ship's offset depending on the direction specified. 
        let shipOffset; 
        if (this.direction === 'top') shipOffset = offsets[0]; 
        else if (this.direction === 'left') shipOffset = offsets[1]; 
        else if (this.direction === 'right') shipOffset = offsets[2]; 
        else shipOffset = offsets[3]; 

        // Populating the ship's .coords attribute with the cells the ship occupies. 
        let curX = this.coords[0][0]; 
        let curY = this.coords[0][1]; 

        for (let i = 0; i < this.length - 1; i++) {
            let newX = curX + shipOffset[0]; 
            let newY = curY + shipOffset[1];
            this.coords.push([newX, newY]); 
            curX = newX; 
            curY = newY; 
        }
    }
}; 

class Gameboard {
    constructor() {
        this.grid = this.create(); 
        this.ships = []; 
        this.gameOver = false; 
        this.missedShots = [];
    }
    add(ship) {
        this.ships.push(ship); 
        for (const coord of ship.coords) {
            this.grid[coord[0]][coord[1]] = "O"; 
        }
    }
    receiveAttack(coord) {
        // Initially check if the grid cell is occupied by a ship. Every cell occupied by a ship will have the value "O".
        if (this.grid[coord[0]][coord[1]] === "O") {
            // Change the marking of the grid cell to "X" to mark that it's been hit by an attack. 
            this.grid[coord[0]][coord[1]] = "X"; 
            // If occupied by a ship, find the specific Ship object that is occupying the cell, increment it's hit count, 
            // check if the game is over.
            for (const ship of this.ships) {
                for (const coordinate of ship.coords) {
                    if (coordinate.every(function(element, index) {return element === coord[index]})) {
                        ship.hit(); 
                        this.checkGameOver();
                    }
                }
            }
        }
        // Otherwise, add the attack to missedShots
        else {
            this.missedShots.push(coord); 
        }
    }
    checkGameOver() {
        for (const ship of this.ships) {
            for (const coord of ship.coords) {
                if (this.grid[coord[0]][coord[1]] === "O")
                    this.gameOver = false; 
            }
        }
        this.gameOver = true; 
    }
    create() {
        const board = []; 
        for(let r = 0; r < 9; r++) {
            let row = []; 
            for (let c = 0; c < 9; c++) {
                row.push('.'); 
            }
            board.push(row); 
        }
        return board; 
    }
    isValidMove(x, y) {
        if (this.grid[x][y] === "X" || this.missedShots.includes([x,y])) 
            return false; 
        else   
            return true; 
    }
}; 

class Player {
    constructor(isComputer) {
        this.board = new Gameboard(); 
        this.current = false; 
        this.won = false; 
        this.isComputer = isComputer; 
    }
    generateRandomAttack() {
        let randomX = Math.floor(Math.random() * 10); 
        let randomY = Math.floor(Math.random() * 10); 

        while (!this.board.isValidMove(randomX, randomY)) {
            randomX = Math.floor(Math.random * 10);
            randomY = Math.floor(Math.random * 10); 
        }

        return [randomX, randomY]; 
    }
    move(coord, enemy) {
        this.toggleCurrPlayer();  
        enemy.board.receiveAttack(coord); 
        this.wins(enemy); 
        enemy.toggleCurrPlayer(); 
    }
    wins(enemy) {
        if (enemy.board.gameOver) 
            this.won = true; 
    }
    toggleCurrPlayer() {
        this.current === false ? this.current = true : this.current = false; 
    }
}

module.exports = {Ship, Gameboard, Player}; 