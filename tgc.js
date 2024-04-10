var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.beginPath();
context.moveTo(0, 0);
context.lineTo(2000, 1000);
context.stroke();
let square = {
  height: 80,
  width: 30,
  color: "green",
  posX: 230,
  posY: 500,
  speedX: 0, // Egenskaper för att styra hastigheten på rutan
  speedY: 0,
};

// Variabler för att styra hastigheten på rutan
let speedX = 2;
let speedY = 2;

//Ritar ut en ruta med sin färg, på den position den befinner sig.
function drawRect(rect) {
  context.fillStyle = rect.color;
  context.fillRect(rect.posX, rect.posY, rect.width, rect.height);
}

//Uppdaterar postionen på en ruta, beror av speedX och speedY
//   function updatePosition(rect) {}
function updatePosition(rect) {
  // Kontrollera om rutan kolliderar med nedre kanten av canvasen.
  if (rect.posY + rect.height >= canvas.height) {
    // Vänd på hastigheten i y-led
    rect.speedY = -rect.speedY;
  }

  rect.posX += rect.speedX;
  rect.posY += rect.speedY;
  console.log(rect);
}

// Denna funktion "tömmer" canvasen genom att måla den svart.
function clearCanvas() {
  context.fillStyle = "beige";
  context.fillRect(0, 0, canvas.width, canvas.height);
}
// Det här är huvudfunktionen som kör funktioner för att animeringen ska fungera.

function update() {
  updatePosition(square);
  clearCanvas();
  drawRect(square);
  requestAnimationFrame(update);
}
requestAnimationFrame(update)
function moveCar(direction) {
        if (direction === 'left' && carX > 0) {
            carX -= carSpeed;
        } else if (direction === 'right' && carX + carWidth < canvas.width) {
            carX += carSpeed;
        }
    }
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    moveCar("left");
  } else if (event.key === "ArrowRight") {
    moveCar("right");
  }
});
