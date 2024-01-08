import { Gameboard } from '../factories/Gameboard'; 
import { Ship } from '../factories/Ship';

class Player {

    constructor(name, index) {
        this.name = name;
        this.board = new Gameboard();
        this.index = index; 
    }

    generateRandomAttack(opponent) {
        // How to generate random number between a specific range (inclusive): Math.floor(Math.random() * (max - min + 1) + min)
        let randomX = Math.floor(Math.random() * (9 - 0 + 1) + 0); 
        let randomY = Math.floor(Math.random() * (9 - 0 + 1) + 0); 

        while (!opponent.board.isValidMove([randomX, randomY])) {
            randomX = Math.floor(Math.random() * (9 - 0 + 1) + 0);
            randomY = Math.floor(Math.random() * (9 - 0 + 1) + 0); 
        }

        return [randomX, randomY]; 
    }

    move(coord, enemy) { 
        enemy.board.receiveAttack(coord); 
    }

    setShip(type, startCoord, isHorizontal) {
        const newShip = new Ship(type, startCoord, isHorizontal); 
        this.board.add(newShip);
    }
}

export { Player };