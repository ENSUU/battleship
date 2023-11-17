const {Ship, Gameboard} = require('./index'); 

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
    const testBoard = new Gameboard(); 

    expect(testShip.coords).toBe([[0,0], [1,1], [2,2]]); 
}); 

test("Gameboard's receiveAttack function working properly", () => {
    const testShip = new Ship(3, [0,0], 'top'); 
    const testBoard = new Gameboard(); 
    // The game board will be a 10 x 10 2D array. 

    // Testing receiveAttack function of gameboard 
    // - Case 1: Valid coordinate -> Increment ship's hit count by 1. 
    expect(testBoard.receiveAttack([0,0])).toBe(true); 
    expect(testShip.hitCount).toBe(1); 

    // - Case 2: Invalid coordinate -> Record missed attack coordinate. 
    // Probably need an attribute for GameBoard to keep track of this. 
    expect(testBoard.receiveAttack([5,2])).toBe(false); 
    expect(testBoard.missedShots).toBe([[5,2]]); 
}); 

test('Checking if all ships on board sank', () => {
    const testBoard = new Gameboard(); 
    const testShip = new Ship(1, [2,2], 'top'); 

    testBoard.add(testShip); 
    expect(testBoard.isSunk).toBe(false); 

    testBoard.receiveAttack([2,2]); 
    expect(testBoard.isSunk).toBe(true); 
}); 