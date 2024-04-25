var canvas = document.getElementById("canvas");
var img = document.getElementById("road");
var context = canvas.getContext("2d");
var img = new Image();
img.src = "car.png";
var bild = new Image();
bild.src = "road.png";
var bil = new Image();
bil.src = "playerCar.png";
var Green = new Image();
Green.src = "Green.png";
var Blue = new Image();
Blue.src = "Blue.png";

r = 1500;
g = 3460;
b = 7840;

let square = {
  height: 80,
  width: 30,
  color: "purple",
  posX: 230,
  posY: 450,
  speedX: 0, // Egenskaper för att styra hastigheten på rutan
  speedY: 0,
  speed: 5,
};

// Variabler för att styra hastigheten på rutan
let obstacleSpeed = 4;
let speedX = 2;
let speedY = 2;

//Ritar ut en ruta med sin färg, på den position den befinner sig.
function drawRect(rect) {
  context.drawImage(bil, rect.posX, rect.posY, rect.width, rect.height);
}
function Background() {
  context.drawImage(bild, 0, 0, canvas.width, canvas.height);
}
function collition() {}

let score = 0;

function writeScore() {
  context.fillStyle = "black";
  context.fillText(`score: ${score}`, 5, 50);
  context.font = "50px serif";
}
//Uppdaterar postionen på en ruta, beror av speedX och speedY
//   function updatePosition(rect) {}
function updatePosition(rect) {
  // Kontrollera om rutan kolliderar med nedre kanten av canvasen.
  if (rect.posY + rect.height >= canvas.height + 1) {
    // Vänd på hastigheten i y-led
    rect.speedY = -rect.speedY;
  } else if (rect.posY + rect.height <= -1 + rect.height) {
    rect.speedY = -rect.speedY;
  } else if (rect.posX + rect.width >= canvas.width) {
    rect.speedX = -rect.speedX;
  } else if (rect.posX + rect.width <= 0 + rect.width) {
    rect.speedX = -rect.speedX;
  }

  rect.posX += rect.speedX;
  rect.posY += rect.speedY;
  console.log(rect);
}

function updateObstaclePosition(obstacles) {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    obstacle.y += 4;
    console.log(obstacle);
  }
}

function removeObstaclesOutOfView(obstacles) {
  let removeIndecies = [];
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (obstacle.y > 600) {
      console.log("remove", i);
      removeIndecies.push(i);
    }
  }
  console.log("removeIndecies", removeIndecies.length);
  for (let i = removeIndecies.length - 1; i >= 0; i--) {
    console.log("tar bort");
    obstacles.splice(i, 1);
    score += 5;
  }

  return obstacles;
}

// Denna funktion "tömmer" canvasen genom att måla den svart.
function clearCanvas() {
  context.drawImage(bil, 0, 0);
  context.fillRect(0, 0, canvas.width, canvas.height);
}

let obstacles = [];

function drawObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    context.drawImage(
      obstacle.image,
      obstacle.x,
      obstacle.y,
      obstacle.width,
      obstacle.height
    );
  }
}
function GameOver(rect) {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (
      rect.posX < obstacle.x + obstacle.width &&
      rect.posX + rect.width > obstacle.x &&
      rect.posY < obstacle.y + obstacle.height &&
      rect.posY + rect.height > obstacle.y
    ) {
      context.fillStyle = "black";
      context.fillText("Game over", canvas.width / 2 - 125, canvas.height / 2);
      obstacles.splice(0, obstacles.length);
      gamerunning = false;
    }
  }
}
function restartGame() {
  obstacles.slice(0, obstacles.length);
  rect.posX = 230;
  rect.posY = 450;
  gamerunning = true;
}
document.getElementById("Restart").addEventListener("click", function () {
  restartGame();
});
// Det här är huvudfunktionen som kör funktioner för att animeringen ska fungera.
gamerunning = true;
function update() {
  if (!gamerunning) return;
  updatePosition(square);
  updateObstaclePosition(obstacles);
  obstacles = removeObstaclesOutOfView(obstacles);
  clearCanvas();
  Background();
  drawRect(square);
  drawObstacles();
  console.log(obstacles.length);
  GameOver(square);
  writeScore();
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
document.onkeydown = function (e) {
  console.log(e);
  const key = e.key;
  switch (key) {
    case "w":
      square.speedY = -square.speed;
      break;
    case "a":
      square.speedX = -square.speed;
      break;
    case "s":
      square.speedY = square.speed;
      break;
    case "d":
      square.speedX = square.speed;
      break;
  }
};
document.onkeyup = function (e) {
  console.log(e);
  const key = e.key;
  switch (key) {
    case "w":
      square.speedY = 0;
      break;
    case "a":
      square.speedX = 0;
      break;
    case "s":
      square.speedY = 0;
      break;
    case "d":
      square.speedX = 0;
      break;
  }
};

function addObstacle() {
  obstacles.push({
    image: img,
    width: 100,
    height: 150,
    x: Math.floor(Math.random() * 400),
    y: 0,
  });
}
function addGreencar() {
  obstacles.push({
    image: Green,
    width: 100,
    height: 150,
    x: Math.floor(Math.random() * 400),
    y: 0,
  });
}
function addBluecar() {
  obstacles.push({
    image: Blue,
    width: 100,
    height: 150,
    x: Math.floor(Math.random() * 400),
    y: 0,
  });
}
setInterval(addBluecar, b);
setInterval(addGreencar, g);
setInterval(addObstacle, r);
