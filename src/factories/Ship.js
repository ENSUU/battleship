class Ship {

    #shipTypes = {
        'carrier': 5, 
        'battleship': 4, 
        'destroyer': 3, 
        'submarine': 3, 
        'patrol': 2
    };

    constructor(type, startCoord, isHorizontal) {
        this.length = this.#shipTypes[type]; 
        this.hitCount = 0; 
        this.sunkStatus = false; 
        this.coords = [startCoord];
        this.populateCoords(isHorizontal);
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

    populateCoords(isHorizontal) {
        // If the length of the ship is 1, it occupies only one cell. The starting coordinate is the ship's only coordinate. 
        if (this.length < 2) return; 

        const offsetIndex = isHorizontal === true ? 0 : 1; 
        const offsets = [[0, 1], [1, 0]];  

        // Determining the ship's offset depending on the direction specified. 
        const shipOffset = offsets[offsetIndex]; 
        // if (this.direction === 'top') shipOffset = offsets[0]; 
        // else if (this.direction === 'left') shipOffset = offsets[1]; 
        // else if (this.direction === 'right') shipOffset = offsets[2]; 
        // else shipOffset = offsets[3]; 

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

export { Ship };