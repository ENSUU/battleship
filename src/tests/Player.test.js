import { Player } from '../factories/Player';
import { Ship } from '../factories/Ship';

test('Initialize both player board properly', () => {
    const testPlayerOne = new Player('Player 1', false); 
    const testPlayerTwo = new Player('Player 2', false); 

    // Testing the creation of each player's unique Gameboard object 
    // Both .board attributes should be the same 10x10 grid. 
    expect(testPlayerOne.board).toStrictEqual(testPlayerTwo.board); 
}) 

test('Player turn alternation working', () => {
    const testPlayerOne = new Player('Player 1', false); 
    testPlayerOne.toggleCurrPlayer(); 
    const testPlayerTwo = new Player('Player 2', false);  

    // Testing .current attribute. Used to keep track of which player's turn it is (for now). 
    expect(testPlayerOne.current).toBe(true); 
    // After player one completes their turn, .current should be false. 
    testPlayerOne.move([0,0], testPlayerTwo); 
    expect(testPlayerOne.current).toBe(false); 
    expect(testPlayerTwo.current).toBe(true);
})

test('Random choice (for computer) working', () => {
    const testPlayerOne = new Player('Player 1', false); 
    const testPlayerTwo = new Player('Player 2', false); 

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
}); 

test('Player adding ship working correctly', () => {
    const testPlayerOne = new Player('Player 1', false); 

    testPlayerOne.setShip('Carrier', [2,4], 'right'); 
    expect(testPlayerOne.board.ships.length).toBe(1);
})