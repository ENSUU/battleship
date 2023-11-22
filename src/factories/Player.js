import { Gameboard } from '../factories/Gameboard'; 
import { Ship } from '../factories/Ship';

class Player {

    constructor(name, index) {
        this.name = name;
        this.board = new Gameboard();
        this.index = index; 
        this.current = false; 
        this.won = false; 
    }

    generateRandomAttack() {
        let randomX = Math.floor(Math.random() * 10); 
        let randomY = Math.floor(Math.random() * 10); 

        while (!this.board.isValidMove([randomX, randomY])) {
            randomX = Math.floor(Math.random * 10);
            randomY = Math.floor(Math.random * 10); 
        }

        return [randomX, randomY]; 
    }

    move(coord, enemy) {
        this.toggleCurrPlayer();  
        enemy.board.receiveAttack(coord); 
        enemy.toggleCurrPlayer(); 
    }

    toggleCurrPlayer() {
        this.current === false ? this.current = true : this.current = false; 
    }

    setShip(type, startCoord, direction) {
        const newShip = new Ship(type, startCoord, direction); 
        this.board.add(newShip);
    }
}

export { Player };