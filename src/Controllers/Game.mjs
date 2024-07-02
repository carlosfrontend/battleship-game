import Dom from '../Dom/Dom.mjs';
import Player from '../Models/Player.mjs';
import missedIcon from '../img/shot.svg';
import impactIcon from '../img/impact.svg';

const Game = () => {
  const computerBoardDom = document.querySelector('#computer-board');
  const playerBoardDom = document.querySelector('#player-board');
  const message = document.querySelector('.message');

  // Creates the players
  const player = Player('Player');
  const computer = Player();

  // Create the boards
  const playerBoard = player.createGameBoard();
  const computerBoard = computer.createGameBoard();

  // Shows the player titles
  Dom().showPlayerTitles(player.name, computer.name);

  // Draw void boards
  Dom().drawBoards();

  // Place the ships
  Dom().placePlayerShips(player);

  // Shows the player board
  Dom().showPlayerBoard(playerBoard);

  // Place the computer ships
  Dom().placeComputerShips(computer);

  // Shows the computer board
  Dom().showComputerBoard(computerBoard);

  // Function to generate a random number between 0 and 100 (both included)
  function getRandomNum() {
    return Math.floor(Math.random() * 100);
  }

  // Create a set to store unique positions
  const positionsSet = new Set();

  // Generate random positions until we have 100 unique ones
  while (positionsSet.size < 100) {
    const pos = getRandomNum();
    positionsSet.add(`${pos}`);
  }

  // Convert the set to a numbers array
  const positions = Array.from(positionsSet).map(num => +num);


  const computerAttack = () => {
 
    
    const computerHandler = (e) => {
      e.stopPropagation();
      console.log(e.bubbles);
      if (e.target.closest('img')) {
        const cell = e.target;
        const attack = player.board.receiveAttack(+cell.getAttribute('x'), +cell.getAttribute('y'));

        if(attack === 'Missed'){
          cell.parentNode.disabled = true;
          cell.src = missedIcon;
          playerBoardDom.removeEventListener('click', computerHandler);
          message.textContent = `${player.name} turn`;
          // eslint-disable-next-line no-use-before-define
          playerAttack();
        }

        if (attack === false) {
          cell.parentNode.disabled = true;
          // positions.shift();
          cell.src = impactIcon;
          playerBoardDom.addEventListener('click', computerHandler, {once: true, capture: false} );
          setTimeout(() => {
            [...playerBoardDom.children][positions.shift()].firstElementChild.click();
          }, 800);

        }
        if (attack === true) {
          cell.parentNode.disabled = true;
          // positions.shift();
          cell.src = impactIcon;
          playerBoardDom.addEventListener('click', computerHandler, {once: true, capture: false} );
          setTimeout(() => {
            [...playerBoardDom.children][positions.shift()].firstElementChild.click();
          }, 800);
        }

        if (attack === 'The ship you are trying to hit has already sank.') {
          cell.parentNode.disabled = true;
          // positions.shift();
          cell.src = impactIcon;
          playerBoardDom.addEventListener('click', computerHandler, {once: true, capture: false} );
          setTimeout(() => {
            [...playerBoardDom.children][positions.shift()].firstElementChild.click();
          }, 800);
        }

        console.log(cell);
        console.log(player);
        console.table(playerBoard);
        if(player.board.allShipsSunk()){
          message.textContent = `${computer.name} Wins!`;
        }
      }
    };
    
    playerBoardDom.addEventListener('click', computerHandler, {once: true, capture:false});
    [...playerBoardDom.children][positions.shift()].firstElementChild.click();
  };

  const playerAttack = () => {
    const playerHandler = (e) => {
      e.stopPropagation();
      console.log(e.bubbles);
      if (e.target.closest('img')) {
        const cell = e.target;
        const x = +cell.getAttribute('x');
        const y = +cell.getAttribute('y');
        const attack = computer.board.receiveAttack(x, y);
        if (attack === 'Missed') {
          cell.src = missedIcon;
          cell.parentNode.disabled = true;
          // Stop interaction
          computerBoardDom.removeEventListener('click', playerHandler);
          // Change turn to the computer
          message.textContent = `${computer.name} turn`;
          setTimeout(() => {
            computerAttack();
          }, 800);
        }
        if (attack === false || attack === true) {
          cell.parentNode.disabled = true;
          cell.src = impactIcon;
        }

        if(attack === 'The ship you are trying to hit has already sank.'){
          cell.parentNode.disabled = true;
          cell.src = impactIcon;
        }

        console.log(cell);
        console.log(computer);
        console.table(computerBoard);
        if(computer.board.allShipsSunk()){
          message.textContent = `${player.name} Wins !`;
          computerBoardDom.removeEventListener('click', playerHandler);
        }
      }
    };
    
    computerBoardDom.addEventListener('click', playerHandler);
  };

  // The Player starts the game
  message.textContent = `${player.name} turn`;
  playerAttack();
};

export default Game;
