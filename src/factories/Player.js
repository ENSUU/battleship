import { Gameboard } from '../factories/Gameboard'; 

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

export { Player };