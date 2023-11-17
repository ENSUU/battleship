class Ship {
    constructor(length, startCoord, direction) {
        this.length = length; 
        this.hitCount = 0; 
        this.sunkStatus = false; 
        this.startCoord = startCoord; 
        this.direction = direction; 
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
}; 

class GameBoard {
    constructor() {

    }
}

module.exports = Ship; 