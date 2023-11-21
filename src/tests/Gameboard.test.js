import { Gameboard } from '../factories/Gameboard';
import { Ship } from '../factories/Ship';

test("Gameboard's receiveAttack function working properly", () => {
    const testShip = new Ship(3, [0,0], 'top'); 
    const testBoard = new Gameboard(); 
    testBoard.add(testShip);
    // The game board will be a 10 x 10 2D array. 

    // Testing receiveAttack function of gameboard 
    // - Case 1: Valid coordinate -> Increment ship's hit count by 1. 
    testBoard.receiveAttack([0,0]);
    expect(testBoard.grid[0][0]).toBe("X"); 
    expect(testShip.hitCount).toBe(1); 

    // - Case 2: Invalid coordinate -> Record missed attack coordinate. 
    // Probably need an attribute for GameBoard to keep track of this.
    testBoard.receiveAttack([5,2]); 
    expect(testBoard.grid[5][2]).toBe('.');  
    expect(testBoard.missedShots).toStrictEqual([[5,2]]); 
}); 

test('Checking if all ships on board sank', () => {
    const testBoard = new Gameboard(); 
    const testShip = new Ship(1, [2,2], 'top'); 

    testBoard.add(testShip); 
    expect(testBoard.gameOver).toBe(false); 

    testBoard.receiveAttack([2,2]); 
    expect(testBoard.gameOver).toBe(true); 
}); 

test('Adding ship to the gameboard', () => {
    const testShip = new Ship(1, [2,2], 'top'); 
    const testBoard = new Gameboard(); 

    testBoard.add(testShip); 
    expect(testBoard.ships).toContain(testShip);
}); 

test('Place ship at coordinates', () => {
    // For this to work, constructor needs to be updated. 
    // On object construction, need to pass in ship's length, staring coords, and direction from starting coord (top, left, right, bottom);
    const testShip = new Ship(3, [0, 0], 'right');

    expect(testShip.coords).toStrictEqual([[0,0], [1,0], [2,0]]); 
}); 