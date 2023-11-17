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
        this.grid = Array.from(Array(10), () => new Array(10)); 
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
            // check if the game is over, and return true. 
            for (const ship of this.ships) {
                for (const coordinate of ship.coords) {
                    if (coordinate.every(function(element, index) {return element === coord[index]})) {
                        ship.hit(); 
                        this.checkGameOver();
                        return true; 
                    }
                }
            }
        }
        // Otherwise, add the attack to missedShots and return false. 
        else {
            this.missedShots.push(coord); 
            return false;
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
}

module.exports = {Ship, Gameboard}; 