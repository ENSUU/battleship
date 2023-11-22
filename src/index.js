import { Player } from './factories/Player'; 

// Player One is the user. Player Two will be a computer. 
const playerOne = new Player('Player 1', 0); 
playerOne.current = true; 
const playerTwo = new Player('Computer', 1);

// Both players move/populate their boards with the ships. Hard coded for now.
playerOne.setShip('Carrier', [9, 2], 'right'); 
playerOne.setShip('Battleship', [4, 5], 'right'); 
playerOne.setShip('Destroyer', [5, 1], 'bottom'); 
playerOne.setShip('Submarine', [2, 2], 'right'); 
playerOne.setShip('Patrol Boat', [2, 9], 'top'); 
playerOne.board.populateDOMGrid(0);

playerTwo.setShip('Carrier', [9, 2], 'right'); 
playerTwo.setShip('Battleship', [4, 5], 'right'); 
playerTwo.setShip('Destroyer', [5, 1], 'bottom'); 
playerTwo.setShip('Submarine', [2, 2], 'right'); 
playerTwo.setShip('Patrol Boat', [2, 9], 'top'); 
playerTwo.board.populateDOMGrid(1);

// Need to add main game loop and module for DOM manipulation. 

// while (!playerOne.board.gameOver && !playerTwo.board.gameOver) { 

//     let currentPlayer, opponent; 
//     if (!playerOne.current) {
//         currentPlayer = playerTwo; 
//         opponent = playerOne; 
//     }
//     else {
//         currentPlayer = playerOne; 
//         opponent = playerTwo; 
//     }

//  Adding click event listener to each cell of the DOM grids. 
//     const cells = document.querySelectorAll('.gameboard-cell'); 
//     cells.forEach(cell => {
//         cell.addEventListener('click', () => {
//             currentPlayer.move([cell.dataset.x, cell.dataset.y], opponent);
//             currentPlayer.board.renderDOMGrid(currentPlayer.index); 
//             opponent.board.renderDOMGrid(opponent.index); 
//         })
//     })

//     if (currentPlayer === playerTwo) {
//         const randomAttack = playerTwo.generateRandomAttack(); 
//         currentPlayer.move(randomAttack, opponent); 
//     }

//     if (opponent.board.gameOver) {
//         console.log(`${currentPlayer} wins! GG`);
//         break;
//     }
    
// }





