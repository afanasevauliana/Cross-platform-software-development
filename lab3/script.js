const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");
const cntElement = document.getElementById("cnt");
const recordElement = document.getElementById("record");
const restartButton = document.getElementById("restart-button");
const gameMessage = document.getElementById("game-message");
const cellSize = 20; // размер одной клетки
let cnt = 0;
let record = Number(localStorage.getItem("snakeRecord")) || 0;
recordElement.textContent = record;
const snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];

// начальные координаты еды
const food = { x: 20, y: 15 };

// Вправо: directionX =  1, directionY =  0
// Влево:  directionX = -1, directionY =  0
// Вниз:   directionX =  0, directionY =  1
// Вверх:  directionX =  0, directionY = -1

// начальное направление
let directionX = 1;
let directionY = 0;
let directionChanged = false;

function drawSnake() {
  context.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    const part = snake[i];
    context.fillRect(part.x * cellSize, part.y * cellSize, cellSize, cellSize);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// перемещает змейку на одну клетку
function moveSnake() {
  const head = snake[0]; // первый элемент массива - голова змейки
  const newHead = {
    x: head.x + directionX,
    y: head.y + directionY
  };
  snake.unshift(newHead); // добавляет новую голову в начало массива

  if (newHead.x === food.x && newHead.y === food.y) { // если координаты головы совпали с едой, то хвост не удаляем и генерируем еду в рандомном месте
    cnt = cnt + 1;
    cntElement.textContent = cnt;

    if (cnt > record) {
      record = cnt;
      recordElement.textContent = record;
      localStorage.setItem("snakeRecord", record);
    }

    const columns = canvas.width / cellSize;
    const rows = canvas.height / cellSize;
    let foodOnSnake = true;

    // повторяет генерацию, если случайная клетка занята змейкой
    while (foodOnSnake) {
      food.x = Math.floor(Math.random() * columns);
      food.y = Math.floor(Math.random() * rows);
      foodOnSnake = false;

      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
          foodOnSnake = true;
          break;
        }
      }
    }
  } else {
    snake.pop(); // удаляет хвост
  }
}

function changeDirection(event) {
  // До следующего перемещения второе изменение направления запрещено.
  if (directionChanged) {
    return;
  }

  if (event.key === "ArrowUp" && directionY === 0) {
    directionX = 0;
    directionY = -1;
    directionChanged = true;
  } else if (event.key === "ArrowDown" && directionY === 0) {
    directionX = 0;
    directionY = 1;
    directionChanged = true;
  } else if (event.key === "ArrowLeft" && directionX === 0) {
    directionX = -1;
    directionY = 0;
    directionChanged = true;
  } else if (event.key === "ArrowRight" && directionX === 0) {
    directionX = 1;
    directionY = 0;
    directionChanged = true;
  }
}
// вызывает changeDirection при каждом нажатии клавиши
document.addEventListener("keydown", changeDirection);

function gameLoop() {
  clearCanvas();
  moveSnake();
  directionChanged = false;

  const head = snake[0];
  if (head.x < 0 || head.y < 0 || head.x * cellSize >= canvas.width || head.y * cellSize >= canvas.height) {
    restartButton.hidden = false;
    gameMessage.textContent = "Игра окончена: змейка столкнулась со стеной";
    gameMessage.hidden = false;
    return;
  }

  // проверяет, не совпали ли координаты головы с одной из частей тела
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      restartButton.hidden = false;
      gameMessage.textContent = "Игра окончена: змейка столкнулась с собой";
      gameMessage.hidden = false;
      return;
    }
  }

  drawSnake();
  drawFood();
  setTimeout(gameLoop, 300);
}


drawSnake();
drawFood();

// при нажатии кнопки возвращает начальные данные и запускает игру
restartButton.addEventListener("click", function () {
  snake.length = 0;
  snake.push(
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  );

  directionX = 1;
  directionY = 0;
  directionChanged = false;
  food.x = 20;
  food.y = 15;
  cnt = 0;
  cntElement.textContent = cnt;

  clearCanvas();
  drawSnake();
  drawFood();
  gameMessage.hidden = true;
  restartButton.hidden = true;
  setTimeout(gameLoop, 300);
});
