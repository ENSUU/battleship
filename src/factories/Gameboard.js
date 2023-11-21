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

export {Gameboard};