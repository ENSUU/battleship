const {Ship, Gameboard, Player} = require('./index'); 

// Ship Tests
test('Accessing Ship object .length and .sunkStatus property', () => {
    const testShip = new Ship(3, [2,2], 'top'); 
    expect(testShip.hitCount).toBe(0);
    expect(testShip.length).toBe(3); 
    expect(testShip.sunkStatus).toBe(false); 
}); 

test('Ship object .hit and .is`Sunk functions working', () => {
    const testShip = new Ship(2, [2,2], 'bottom'); 
    testShip.hit(); 
    expect(testShip.hitCount).toBe(1); 
    expect(testShip.sunkStatus).toBe(false); 
    testShip.hit(); 
    expect(testShip.hitCount).toBe(2); 
    expect(testShip.sunkStatus).toBe(true); 
}); 

test('.populateCoords method working properly', () => {
    const testShip = new Ship(3, [2,2], 'top'); 
    expect(testShip.coords).toStrictEqual([[2,2], [2,3], [2,4]]); 

    const testShipTwo = new Ship(2, [5,5], 'bottom'); 
    expect(testShipTwo.coords).toStrictEqual([[5,5], [5,4]]);

    const testShipThree = new Ship(1, [0,0], 'right'); 
    expect(testShipThree.coords).toStrictEqual([[0,0]]);
})

// Gameboard Tests
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

// Player Tests
// So, each player will be connected to a unique Gameboard object? 
// Boolean to keep track of player turns? 

test('Initialize both player board properly', () => {
    const testPlayerOne = new Player(); 
    const testPlayerTwo = new Player(); 

    // Testing the creation of each player's unique Gameboard object 
    // Both .board attributes should be the same 10x10 grid. 
    expect(testPlayerOne.board).toStrictEqual(testPlayerTwo.board); 
}) 

test('Player turn alternation working', () => {
    const testPlayerOne = new Player(); 
    testPlayerOne.toggleCurrPlayer(); 
    const testPlayerTwo = new Player(); 

    // Testing .current attribute. Used to keep track of which player's turn it is (for now). 
    expect(testPlayerOne.current).toBe(true); 
    // After player one completes their turn, .current should be false. 
    testPlayerOne.move([0,0], testPlayerTwo); 
    expect(testPlayerOne.current).toBe(false); 
    expect(testPlayerTwo.current).toBe(true);
})

test('Random choice (for computer) working', () => {
    const testPlayerOne = new Player(); 
    const testPlayerTwo = new Player(); 

    // Generates a random attack for the current player. 
    // The returned x and y coordinate from .generateRandomAttack method will always be a valid position on the board. 
    const [randomX, randomY] = testPlayerTwo.generateRandomAttack(); 

    // Ensuring that randomAttack coords are in the range [0, 9]. 
    expect(randomX).toBeGreaterThanOrEqual(0); 
    expect(randomX).toBeLessThan(10);
    expect(randomY).toBeGreaterThanOrEqual(0); 
    expect(randomY).toBeLessThan(10);

    // Attack the randomly generated coordinate. 
    // Since neither player has placed a ship yet, all attacks will just be added to .missedShots. 
    testPlayerOne.board.receiveAttack([randomX, randomY]);
    expect(testPlayerOne.board.missedShots).toStrictEqual([[randomX, randomY]]);    
})