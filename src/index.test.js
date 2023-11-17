const Ship = require('./index'); 

test('Accessing Ship object .length and .sunkStatus property', () => {
    const testShip = new Ship(3); 
    expect(testShip.hitCount).toBe(0);
    expect(testShip.length).toBe(3); 
    expect(testShip.sunkStatus).toBe(false); 
}); 

test('Ship object .hit and .isSunk functions working', () => {
    const testShip = new Ship(2); 
    testShip.hit(); 
    expect(testShip.hitCount).toBe(1); 
    expect(testShip.sunkStatus).toBe(false); 
    testShip.hit(); 
    expect(testShip.hitCount).toBe(2); 
    expect(testShip.sunkStatus).toBe(true); 
}); 