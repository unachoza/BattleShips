//make dom elements
document.addEventListener('DOMContentLoaded', () => {
  const userGrid = document.querySelector('.grid-user');
  const computerGrid = document.querySelector('.grid-computer');
  const displayGrid = document.querySelector('.display-user');
  const ships = document.querySelectorAll('.ships');
  const destroyer = document.querySelector('.destroyer-container');
  const submarine = document.querySelector('.submarine-container');
  const cruiser = document.querySelector('.cruiser-container');
  const battleship = document.querySelector('.battleship-container');
  const carrier = document.querySelector('.carrier-container');
  const startButton = document.querySelector('#start-button');
  const rotateButton = document.querySelector('#rotate');
  const turnDisplay = document.querySelector('#whose-go');
  const infoDisplay = document.querySelector('#info');
  const userSquares = [];
  const computerSquares = [];
  let isHorizontal = true;
  let isGameOver = false;
  let currentPlayer = 'user';
  const width = 10;

  // Create Board
  const createBoard = (grid, squares) => {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.dataset.id = i;
      grid.appendChild(square);
      squares.push(square);
    }
  };

  createBoard(userGrid, userSquares);
  createBoard(computerGrid, computerSquares);

  // ships
  const shipsArray = [
    {
      name: 'destroyer',
      directions: [
        [0, 1],
        [0, width],
      ],
    },
    {
      name: 'submarine',
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: 'cruiser',
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: 'battleship',
      directions: [
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3],
      ],
    },
    {
      name: 'carrier',
      directions: [
        [0, 1, 2, 3, 4],
        [0, width, width * 2, width * 3, width * 4],
      ],
    },
  ];

  // Draw the computers ships in random locations.
  const generate = (ship) => {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    let randomStart = Math.abs(
      Math.floor(Math.random() * computerSquares.length - ship.directions[0].length * direction)
    );

    const isTaken = current.some((index) => computerSquares[randomStart + index].classList.contains('taken'));
    const isAtRightEdge = current.some((index) => (randomStart + index) % width === width - 1);
    const isAtLeftEdge = current.some((index) => (randomStart + index) % width === 0);

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
      current.forEach((index) => computerSquares[randomStart + index].classList.add('taken', ship.name));
    else generate(ship);
  };

  generate(shipsArray[0]);
  generate(shipsArray[1]);
  generate(shipsArray[2]);
  generate(shipsArray[3]);
  generate(shipsArray[4]);

  //Rotate the ships
  const rotate = () => {
    if (isHorizontal) {
      destroyer.classList.toggle('destroyer-container-vertical');
      submarine.classList.toggle('submarine-container-vertical');
      cruiser.classList.toggle('cruiser-container-vertical');
      battleship.classList.toggle('battleship-container-vertical');
      carrier.classList.toggle('carrier-container-vertical');
      isHorizontal = false;
      console.log(isHorizontal);
      return;
    }
    if (!isHorizontal) {
      destroyer.classList.toggle('destroyer-container-vertical');
      submarine.classList.toggle('submarine-container-vertical');
      cruiser.classList.toggle('cruiser-container-vertical');
      battleship.classList.toggle('battleship-container-vertical');
      carrier.classList.toggle('carrier-container-vertical');
      isHorizontal = true;
      console.log(isHorizontal);
      return;
    }
  };
  rotateButton.addEventListener('click', rotate);

  // Move Around User Ship
  let selectedShipNameWithIndex;
  let draggedShip;
  let draggedShipLength;

  ships.forEach((ship) =>
    ship.addEventListener('mousedown', (e) => {
      console.log(e);
      selectedShipNameWithIndex = e.target.id;
      console.log(selectedShipNameWithIndex);
    })
  );
  const dragStart = (e) => {
    console.log(e.target);
    console.log(this);
    draggedShip = this;
    console.log(draggedShip);
    draggedShipLength = this.childNodes.length;
    console.log(draggedShip);
  };
  console.log(ships);
  ships.forEach((ship) => ship.addEventListener('dragstart', dragStart));
  userSquares.forEach((square) => square.addEventListener('dragstart', dragStart));
  // userSquares.forEach((square) => square.addEventListener('dragover', dragOver));
  // userSquares.forEach((square) => square.addEventListener('dragenter', dragEnter));
  // userSquares.forEach((square) => square.addEventListener('dragleave', dragLeave));
  // userSquares.forEach((square) => square.addEventListener('drop', dragDrop));
  // userSquares.forEach((square) => square.addEventListener('dragend', dragEnd));

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = () => {
    console.log('drag leave');
  };

  const dragDrop = () => {
    let shipNameWithLastId = draggedShip.lastChild.id;
    let shipClass = shipNameWithLastId.slice(0, -2);
    console.log(shipClass);
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
    let shipLastId = lastShipIndex + parseInt(this.dataset.id);
    console.log(shipLastId);

    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex);
    let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex);

    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));

    shipLastId = shipLastId - selectedShipIndex;
    console.log(shipLastId);
    const notAllowedHorizontal = [
      0,
      10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90,
      1,
      11,
      21,
      31,
      41,
      51,
      61,
      71,
      81,
      91,
      2,
      22,
      32,
      42,
      52,
      62,
      72,
      82,
      92,
      3,
      13,
      23,
      33,
      43,
      53,
      63,
      73,
      83,
      93,
    ];
    const notAllowedVertical = [
      99,
      98,
      97,
      96,
      95,
      94,
      93,
      92,
      91,
      90,
      89,
      88,
      87,
      86,
      85,
      84,
      83,
      82,
      81,
      80,
      79,
      78,
      77,
      76,
      75,
      74,
      73,
      72,
      71,
      70,
      69,
      68,
      67,
      66,
      65,
      64,
      63,
      62,
      61,
      60,
    ];
    if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      for (let i = 0; i < draggedShipLength; i++) {
        userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', shipClass);
      }
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
    } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
      for (let i = 0; i < draggedShipLength; i++) {
        userSquares[parseInt(this.dataset.id) - selectedShipIndex + width * i].classList.add('taken', shipClass);
      }
    } else return;

    displayGrid.removeChild(draggedShip);
  };

  const dragEnd = () => {
    console.log('dragend');
  };
});
