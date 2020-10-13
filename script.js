var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); // Se debe estipular que trabajaremos nuestro lienzo en 2d

//ctx.fillStyle = "red"; // .fillStyle selecciona el color de relleno
//ctx.fillRect(0, 0, 480, 640) // .fillRect posiciona un cuadrado con las coordenadas que seleccionemos
// Params(x, y, width, height)
// .clearRect borra todo el lienzo

var GAME = {
    WIDTH: 288,
    HEIGHT: 624
}

var floorX = 0;
var floorX1 = 336;

function drawBg() {
    var bg = new Image();
    bg.src = "assets/sprites/background-day.png"; // imagen a renderizar
    ctx.drawImage(bg, 0, 0); // dibuja la imagen en una posicion determinada
}

function drawFloor() {
    var floor = new Image();
    floor.src = "assets/sprites/base.png";
    floorX-- // decremento x para que la imagen se corra hacia la izquierda
    floorX1--

    if (floorX < -(floor.width)) {
        floorX = GAME.WIDTH;
    }
    if (floorX1 < -(floor.width)) {
        floorX = GAME.WIDTH;
    }

    ctx.drawImage(floor, floorX, 512);
    ctx.drawImage(floor, floorX1, 512);
}

function draw() {
    drawBg();
    drawFloor();
}

// Game Loop
function run() {
    draw();
    window.requestAnimationFrame(run); // función recursiva para ejecutar lo que necesitemos (varios cuadros por segundo)
}


window.requestAnimationFrame(run);