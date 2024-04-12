var canvas = document.getElementById("canvas");
var img = document.getElementById("road")
var context = canvas.getContext("2d");
var img = new Image();
img.src = "car.png";
var bild = new Image();
bild.src = "road.png";

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
let speedX = 2;
let speedY = 2;

//Ritar ut en ruta med sin färg, på den position den befinner sig.
function drawRect(rect) {
  context.drawImage(img, rect.posX, rect.posY, rect.width, rect.height);
}
function Background(){
  context.drawImage(bild, 0, 0, canvas.width, canvas.height)
}
function collition(){

}


//Uppdaterar postionen på en ruta, beror av speedX och speedY
//   function updatePosition(rect) {}
function updatePosition(rect) {
  // Kontrollera om rutan kolliderar med nedre kanten av canvasen.
  if (rect.posY + rect.height >= canvas.height) {
    // Vänd på hastigheten i y-led
    rect.speedY = -rect.speedY;
  }
  else if (rect.posY + rect.height <= 0 + rect.height){
    rect.speedY = -rect.speedY
  }
  else if (rect.posX + rect.width >= canvas.width){
    rect.speedX = -rect.speedX
  }
  else if (rect.posX + rect.width <= 0 + rect.width){
    rect.speedX = -rect.speedX
  }

  rect.posX += rect.speedX;
  rect.posY += rect.speedY;
  console.log(rect);
}

// Denna funktion "tömmer" canvasen genom att måla den svart.
function clearCanvas() {
  context.drawImage(img, 0, 0)
  context.fillRect(0, 0, canvas.width, canvas.height);
}
// Det här är huvudfunktionen som kör funktioner för att animeringen ska fungera.

function update() {
  updatePosition(square);                    
  clearCanvas();
  Background();
  drawRect(square);
  requestAnimationFrame(update);
}
requestAnimationFrame(update)
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
    
