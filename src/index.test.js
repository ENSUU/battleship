const Ship = require('./index'); 

// Ship Tests
test('Accessing Ship object .length and .sunkStatus property', () => {
    const testShip = new Ship(3, [2,2], 'top'); 
    expect(testShip.hitCount).toBe(0);
    expect(testShip.length).toBe(3); 
    expect(testShip.sunkStatus).toBe(false); 
}); 

test('Ship object .hit and .isSunk functions working', () => {
    const testShip = new Ship(2, [2,2], 'bottom'); 
    testShip.hit(); 
    expect(testShip.hitCount).toBe(1); 
    expect(testShip.sunkStatus).toBe(false); 
    testShip.hit(); 
    expect(testShip.hitCount).toBe(2); 
    expect(testShip.sunkStatus).toBe(true); 
}); 

// Gameboard Tests
// - Gameboard is 10 x 10. 
test('Place ship at coordinates', () => {
    // For this to work, constructor needs to be updated. 
    // On object construction, need to pass in ship's length, staring coords, and direction from starting coord (top, left, right, bottom);
    const testShip = new Ship(3, [0, 0], 'right');
    expect(testShip.coords).toBe([[0,0], [1,1], [2,2]]); 
})