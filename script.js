const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const gridSize = 20;
const tileSize = canvas.width / gridSize;

let snake = [
  { x: gridSize / 2, y: gridSize / 2 },
];
let food = getRandomPosition();

let velocity = { x: 1, y: 0 };
let newVelocity = { x: 1, y: 0 };
let score = 0;
let isPaused = false;

function gameLoop() {
  window.addEventListener('touchmove', preventScrolling, { passive: false });
  if (!isPaused) {
    velocity = { ...newVelocity };

    updateSnake();
    if (checkCollision()) {
      gameOver();
      return;
    }
    updateFood();

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();
    drawFood();
    displayScore();
  }

  setTimeout(gameLoop, 100);
}

function updateSnake() {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  head.x = (head.x + gridSize) % gridSize;
  head.y = (head.y + gridSize) % gridSize;

  snake.unshift(head);
  snake.pop();
}

function checkCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}

function updateFood() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    food = getRandomPosition();
    snake.push({ ...snake[snake.length - 1] });
    score++;
  }
}

function drawSnake() {
  context.fillStyle = 'green';
  snake.forEach(segment => {
    context.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });
}

function drawFood() {
  context.fillStyle = 'red';
  context.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function displayScore() {
  context.fillStyle = 'white';
  context.font = '16px Arial';
  context.fillText('Score: ' + score, 10, 30);
}

function gameOver() {
  window.removeEventListener('touchmove', preventScrolling);
  context.fillStyle = 'white';
  context.font = '32px Arial';
  context.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);

  setTimeout(() => {
    if (confirm('Restart the game?')) {
      resetGame();
    }
  }, 500);
}

function resetGame() {
    snake = [{ x: gridSize / 2, y: gridSize / 2}];
    food = getRandomPosition();
    velocity = { x: 1, y: 0 };
    newVelocity = { x: 1, y: 0 };
    score = 0;
    gameLoop();
}

function getRandomPosition() {
return {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
};
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'w' && velocity.y !== 1) newVelocity = { x: 0, y: -1 };
  if (event.key === 'a' && velocity.x !== 1) newVelocity = { x: -1, y: 0 };
  if (event.key === 's' && velocity.y !== -1) newVelocity = { x: 0, y: 1 };
  if (event.key === 'd' && velocity.x !== -1) newVelocity = { x: 1, y: 0 };

  if (event.key === 'Escape') {
    isPaused = !isPaused;
  }
});


// mobile Control
function preventScrolling(event) {
  event.preventDefault();
}

let touchStartX;
let touchStartY;

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  const touchEndX = event.touches[0].clientX;
  const touchEndY = event.touches[0].clientY;

  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0 && velocity.x !== -1) newVelocity = { x: 1, y: 0 };
    if (diffX < 0 && velocity.x !== 1) newVelocity = { x: -1, y: 0 };
  } else {
    if (diffY > 0 && velocity.y !== -1) newVelocity = { x: 0, y: 1 };
    if (diffY < 0 && velocity.y !== 1) newVelocity = { x: 0, y: -1 };
  }

  touchStartX = touchEndX;
  touchStartY = touchEndY;
}


canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);



gameLoop();
