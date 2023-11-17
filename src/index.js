class Ship {
    constructor(length) {
        this.length = length; 
        this.hitCount = 0; 
        this.sunkStatus = false; 
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

module.exports = Ship; 