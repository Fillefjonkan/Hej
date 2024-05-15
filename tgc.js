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

r = 1000;
g = 2300;
b = 8300;

let player = {
  height: 80,
  width: 50,
  color: "purple",
  posX: 230,
  posY: 400,
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

function drawRoad() {
  context.drawImage(bild, 0, 0, canvas.width, canvas.height);
}
differentcarcolors = [img, Green, Blue];
let score = 0;

function writeScore() {
  context.fillStyle = "black";
  context.font = "50px serif";
  TextY = 50;
  TextX = 110;
  context.textAlign = "center";
  context.fillText(`score: ${score}`, TextX, TextY);
}
//Uppdaterar postionen på en ruta, beror av speedX och speedY
//   function updatePosition(rect) {}
function updatePosition(rect) {
  if (rect.posX + 5 < canvas.width) {
    !gamerunning;
    DrawRestartButton();
  }
  if (rect.posY + rect.height >= canvas.height + 1) {
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
    obstacle.y += 6;
    console.log(obstacle);
    CarOverLapping(obstacles);
  }
}
function CarOverLapping(obstacles) {
  for (let i = 0; i < obstacles.length; i++) {
    for (let j = i + 1; j < obstacles.length; j++) {
      if (
        obstacles[i].x < obstacles[j].x + obstacles[j].width &&
        obstacles[i].x + obstacles[i].width > obstacles[j].x &&
        obstacles[i].y < obstacles[j].y + obstacles[j].height &&
        obstacles[i].y + obstacles[i].height > obstacles[j].y
      ) {
        obstacles.splice(j, 1);
        random = Math.floor(Math.random() * 3);
        obstacles.push({
          image: differentcarcolors[random],
          width: 100,
          height: 150,
          x: Math.floor(Math.random() * 400),
          y: -100,
        });
      }
    }
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
canvas.addEventListener("click", function (e) {
  if (!gamerunning) {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const buttonX = 150;
    const buttonY = 310;
    const buttonWidth = 180;
    const buttonHeight = 50;
    if (
      clickX >= buttonX &&
      clickX <= buttonX + buttonWidth &&
      clickY >= buttonY &&
      clickY <= buttonY + buttonHeight
    ) {
      restartGame();
    }
  }
});
function DrawRestartButton() {
  let buttonX = 150;
  let buttonY = 310;
  let buttonWidth = 180;
  let buttonHeight = 50;

  context.fillStyle = "violet";
  context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
  context.fillStyle = "#001122";
  context.textAlign = "center";
  context.font = "25px arial";
  context.fillText("Start Game", 240, 345, 200);
}
function GameOver(rect) {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (
      rect.posX < obstacle.x + obstacle.width - 10 &&
      rect.posX + rect.width > obstacle.x + 10 &&
      rect.posY < obstacle.y + obstacle.height - 10 &&
      rect.posY + rect.height > obstacle.y + 10
    ) {
      context.textAlign = "center";
      context.fillStyle = "black";
      context.fillText("Game over", 240, 290);
      obstacles = [];
      gamerunning = false;
      DrawRestartButton();
    }
  }
}
function restartGame() {
  obstacles = [];
  player.posX = 230;
  player.posY = 400;

  score = 0;
  gamerunning = true;
  requestAnimationFrame(update);
}

// Det här är huvudfunktionen som kör funktioner för att animeringen ska fungera.
gamerunning = true;
function update() {
  if (!gamerunning) return;
  updatePosition(player);
  updateObstaclePosition(obstacles);
  obstacles = removeObstaclesOutOfView(obstacles);
  clearCanvas();
  drawRoad();
  drawRect(player);
  drawObstacles();
  console.log(obstacles.length);
  GameOver(player);
  writeScore();
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
document.onkeydown = function (e) {
  console.log(e);
  const key = e.key;
  switch (key) {
    case "w":
      player.speedY = -player.speed;
      break;
    case "a":
      player.speedX = -player.speed;
      break;
    case "s":
      player.speedY = player.speed;
      break;
    case "d":
      player.speedX = player.speed;
      break;
  }
};
document.onkeyup = function (e) {
  console.log(e);
  const key = e.key;
  switch (key) {
    case "w":
      player.speedY = 0;
      break;
    case "a":
      player.speedX = 0;
      break;
    case "s":
      player.speedY = 0;
      break;
    case "d":
      player.speedX = 0;
      break;
  }
};

function addObstacle() {
  obstacles.push({
    image: img,
    width: 100,
    height: 150,
    x: Math.floor(Math.random() * 400),
    y: -100,
  });
}
function addGreencar() {
  obstacles.push({
    image: Green,
    width: 100,
    height: 150,
    x: Math.floor(Math.random() * 400),
    y: -100,
  });
}
function addBluecar() {
  obstacles.push({
    image: Blue,
    width: 100,
    height: 150,
    x: Math.floor(Math.random() * 400),
    y: -100,
  });
}
setInterval(addBluecar, b);
setInterval(addGreencar, g);
setInterval(addObstacle, r);
