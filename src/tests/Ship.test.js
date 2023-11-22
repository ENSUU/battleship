import { Ship } from '../factories/Ship';

test('Accessing Ship object .length and .sunkStatus property', () => {
    const testShip = new Ship('Submarine', [2,2], 'top'); 
    expect(testShip.hitCount).toBe(0);
    expect(testShip.length).toBe(3); 
    expect(testShip.sunkStatus).toBe(false); 
}); 

test('Ship object .hit and .is`Sunk functions working', () => {
    const testShip = new Ship('Patrol Boat', [2,2], 'bottom'); 
    testShip.hit(); 
    expect(testShip.hitCount).toBe(1); 
    expect(testShip.sunkStatus).toBe(false); 
    testShip.hit(); 
    expect(testShip.hitCount).toBe(2); 
    expect(testShip.sunkStatus).toBe(true); 
}); 

test('.populateCoords method working properly', () => {
    const testShip = new Ship('Submarine', [0,0], 'bottom'); 
    expect(testShip.coords).toStrictEqual([[0,0], [1,0], [2,0]]); 

    const testShipTwo = new Ship('Patrol Boat', [5,5], 'bottom'); 
    expect(testShipTwo.coords).toStrictEqual([[5,5], [6,5]]);
})

