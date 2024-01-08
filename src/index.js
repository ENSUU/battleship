import { Player } from './factories/Player'; 

const Game = (() => {
    // Creating both players. 
    let playerOne = new Player('Player 1', 0); 
    let playerTwo = new Player('Player 2', 1); 

    // Selecting all player & opponent board cells for reference. 
    const playerCells = document.querySelectorAll('.gameboard-cell'); 
    const opponentCells = document.querySelectorAll('.opponent-gameboard-cell'); 

    const gameText = document.querySelector('.game-text'); 
    const startBtn = document.querySelector('.start-btn'); 
    const rotateBtn = document.querySelector('.rotate-btn');
    const restartBtn = document.querySelector('.restart-btn');
    const placeableShips = document.querySelector('.ships-container');

    let running = false; 
    let currentPlayer = playerOne; 

    const toggleCurrPlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne; 
    }

    const getCurrPlayer = () => {
        return currentPlayer; 
    }

    const initializeGame = () => {
        // Set running variable to true. 
        running = true; 

        gameText.textContent = `Game started! Sink all the opponent's ships.`;

        // Randomly generating computer's ship placements. 
        const shipTypes = {
            'carrier': 5, 
            'battleship': 4, 
            'destroyer': 3, 
            'submarine': 3, 
            'patrol': 2
        };
        const shipNames = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol']; 
        const directions = [true, false]; 
        
        let i = 0;
        while (i < shipNames.length) {
            // Generate random number between 0 and 1 (inclusive); 
            const randomDirection = directions[parseInt(Math.floor(Math.random() * (1 - 0 + 1) + 0))]; 
            const randomX = parseInt(Math.floor(Math.random() * (9 - 0 + 1) + 0)); 
            const randomY = parseInt(Math.floor(Math.random() * (9 - 0 + 1) + 0)); 
            // console.log(`Ship: ${shipNames[i]} | Ship Length: ${shipTypes[shipNames[i]]} | Initial random starting coord: ${[randomX, randomY]} | Direction: ${randomDirection}`); 
            // Horizontal = true | Vertical = false; 
            if (randomDirection === true) {
                if (randomY + shipTypes[shipNames[i]] < 9) continue; 
                let isOccupied = false; 
                for (let c = 0; c < shipTypes[shipNames[i]]; c++) {
                    // console.log(typeof(randomY + c)); 
                    // console.log(randomY + c);
                    if (!playerTwo.board.grid[randomX][randomY + c] || playerTwo.board.grid[randomX][randomY + c] === "O") isOccupied = true; 
                }
                if (isOccupied) continue; 
            }
            else {
                if (randomX + shipTypes[shipNames[i]] > 9) continue; 
                let isOccupied = false; 
                for (let r = 0; r < shipTypes[shipNames[i]]; r++) {
                    // console.log(typeof(randomX + r)); 
                    // console.log(randomX + r);
                    if (!playerTwo.board.grid[randomX + r][randomY] || playerTwo.board.grid[randomX + r][randomY] === "O") isOccupied = true; 
                }
                if (isOccupied) continue; 
            }
            // console.log(`Ship: ${shipNames[i]} | Final random starting coord: ${[randomX, randomY]}`);
            playerTwo.setShip(shipNames[i], [randomX, randomY], randomDirection); 
            i++; 
        }

        opponentCells.forEach(cell => {
            cell.addEventListener('click', handleClick); 
        })
    }

    function handleClick(){
        // Get the coordinate [x, y] of the cell that was clicked. 
        const cellIndex = [parseInt(this.getAttribute('data-x')), parseInt(this.getAttribute('data-y'))]; 
        
        // console.log(`Player 1 clicked cell: ${[cellIndex]}`);
        // Figure out who the opponent is depending on the currentPlayer. 
        const opponent = currentPlayer === playerOne ? playerTwo : playerOne; 

        // Input Validation - Making sure the user clicks a cell that hasn't been attacked before. 
        if (!opponent.board.isValidMove(cellIndex)) {
            // console.log(`Cell ${cellIndex} has already been clicked. Click another cell.`); 
            // console.log(`Current player is still ${currentPlayer.name}`); 
            return;
        }
        // currentPlayer's move is to attack the cell that was clicked. 
        currentPlayer.move(cellIndex, opponent); 
        // console.log(currentPlayer);
        // console.log(opponent);
        // Update the opponent's DOM grid to display the attack. 
        DOM.renderDOMGrid(opponent);
        // Check if currentPlayer won the game using checkWinner helper function. 
        checkWinner(currentPlayer, opponent); 
    }

    const computerTurn = () => {
        const randomMove = playerTwo.generateRandomAttack(playerOne); 
        playerTwo.move(randomMove, playerOne); 
        // console.log(`Computer clicked cell ${[randomMove]}`);
        DOM.renderDOMGrid(playerOne); 

        checkWinner(playerTwo, playerOne);
    }

    const checkWinner = (curPlayer, opponent) => {
        if (opponent.board.gameOver === true) {
            running = false; 
            gameText.textContent = `${curPlayer.name} wins the game!`; 

            playerCells.forEach(cell => {
                cell.removeEventListener('click', handleClick); 
            })
    
            opponentCells.forEach(cell => {
                cell.removeEventListener('click', handleClick); 
            })
        }
        else {
            // Update currentPlayer & Generate computer's move. 
            toggleCurrPlayer(); 
            if (opponent.name === "Player 2") computerTurn(); 
        }
    }
    
    function handleRestart() {
        // Relaod the webpage. 
        location.reload();
        // playerOne = new Player('Player 1', 0); 
        // playerTwo = new Player('Player 2', 1); 

        // let running = false; 
        // let currentPlayer = playerOne;

        // restartBtn.classList.toggle('hidden'); 
        // startBtn.classList.toggle('hidden');
        // rotateBtn.classList.toggle('hidden');

        // gameText.textContent = '';

        // placeableShips.innerHTML = `
        //     <div class="ship patrol" draggable="true"></div>
        //     <div class="ship submarine" draggable="true"></div>
        //     <div class="ship destroyer" draggable="true"></div>
        //     <div class="ship battleship" draggable="true"></div>
        //     <div class="ship carrier" draggable="true"></div>
        // `;

        // DOM.resetDOMGrid();
    }

    startBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        initializeGame(); 
        restartBtn.classList.toggle('hidden'); 
        startBtn.classList.toggle('hidden');
    });  

    restartBtn.addEventListener('click', handleRestart); 

    return { getCurrPlayer }; 

})(); 

const DOM = (() => {
    // Rotate the ships (in the beginning). 
    let isHorizontal = true; 
    const rotateBtn = document.querySelector('.rotate-btn');
    rotateBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        const inShipContainer = document.querySelectorAll('.ships-container .ship'); 
        inShipContainer.forEach(ship => {
            const shipName = ship.className.split(' ')[1]; 
            ship.classList.toggle(`${shipName}-vertical`);
        })
        
        isHorizontal === false ? isHorizontal = true : isHorizontal = false; 
    });

    // Move around user ships (in the beginning). 
    const ships = document.querySelectorAll('.ship');
    ships.forEach(ship => ship.addEventListener('dragstart', dragStart))

    let draggedShip; 

    function dragStart() {
        draggedShip = this; 
        // console.log(draggedShip);
    }

    function dragOver(e) {
        e.preventDefault(); 
    }

    function dragEnter(e) {
        e.preventDefault(); 
    }

    function dragLeave() {
        // console.log('drag leave');
    }

    function dragEnd() {
        // console.log('drag end');
    }

    function drop() {
        const shipTypes = {
            'carrier': 5, 
            'battleship': 4, 
            'destroyer': 3, 
            'submarine': 3, 
            'patrol': 2
        };
        const draggedShipType = draggedShip.classList[1];
        const draggedShipLength = shipTypes[draggedShipType];
        const placedIndexPos = [parseInt(this.dataset.x), parseInt(this.dataset.y)]

        // console.log(`Ship Type: ${draggedShipType} | Ship Length: ${draggedShipLength} | Placed Index: ${placedIndexPos}`);

        if (isHorizontal) {
            if (placedIndexPos[1] + (draggedShipLength - 1) <= 9) {
                for (let i = 0; i < draggedShipLength; i++) {
                    const shipCell = document.querySelector(`[data-coord='[${placedIndexPos[0]},${placedIndexPos[1] + i}]']`);
                    shipCell.classList.add('ship'); 
                } 
                draggedShip.remove(); 
                // this.append(draggedShip); 
            }
            else {
                return;
            }
        }
        else {
            if (placedIndexPos[0] + (draggedShipLength - 1) <= 9) {
                for (let i = 0; i < draggedShipLength; i++) {
                    const shipCell = document.querySelector(`[data-coord='[${placedIndexPos[0] + i},${placedIndexPos[1]}]']`);
                    shipCell.classList.add('ship');
                }
                draggedShip.remove(); 
                // this.append(draggedShip);
            }
            else {
                return;
            }
        }
        
        const curPlayer = Game.getCurrPlayer(); 
        curPlayer.setShip(draggedShipType, placedIndexPos, isHorizontal); 

        if (allShipsPlaced()) {
            const startBtn = document.querySelector('.start-btn'); 
            startBtn.classList.toggle('hidden');
            rotateBtn.classList.toggle('hidden');
        }
    }

    const allShipsPlaced = () => {
        return document.querySelectorAll('.ships-container .ship').length === 0 ? true : false; 
    }

    const userSquares = document.querySelectorAll('.user-board .gameboard .gameboard-row .gameboard-cell');
    userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragover', dragOver))
    userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
    userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
    userSquares.forEach(square => square.addEventListener('drop', drop))
    userSquares.forEach(square => square.addEventListener('dragend', dragEnd))
    
    const renderDOMGrid = (player) => {
        const playerGrid = player.board.grid; 
        const playerIndex = player.name === "Player 1" ? 0 : 1;
        const missedShots = player.board.missedShots; 
        
        // Loading the attacks that hit one of the opponent's ship-occupied cells (good attack). 
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                const cell = document.querySelectorAll(`[data-coord='[${r},${c}]']`); 
                if (playerGrid[r][c] === "X") {
                    cell[playerIndex].classList.add('good-attack');
                }
            }
        }
        // Loading the attacks that hit the water on the opponent's grid (bad attack). 
        for (const missed of missedShots) {
            const [r, c] = missed; 
            const cell = document.querySelectorAll(`[data-coord='[${r},${c}]']`);
            cell[playerIndex].classList.add('missed-attack'); 
        }

    }

    const resetDOMGrid = () => {
        userSquares.forEach(cell => {
            cell.classList.remove('ship'); 
            cell.classList.remove('missed-attack'); 
            cell.classList.remove('good-attack');
        })
    }

    return { renderDOMGrid, resetDOMGrid };
})(); 

















