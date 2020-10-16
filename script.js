var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d') // Se debe estipular que trabajaremos nuestro lienzo en 2d

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

var bird = {
    src: "assets/sprites/yellowbird-midflap.png" // Iniciamos el dibujo del pajarito con las alas en el medio
}

function drawBg() {
    var bg = new Image()
    bg.src = "assets/sprites/background-day.png"; // Imagen a renderizar
    ctx.drawImage(bg, 0, 0); // Dibuja la imagen en una posicion determinada
}

function drawFloor() {
    var floor = new Image()
    floor.src = "assets/sprites/base.png";
    
    floorX--; // Queremos que la imagen se mueva hacia la izquierda (la posición x disminuirá)

    if (floorX < -floor.width) {
        floorX = 0; // Hacemos que se reinicie la variable cuando "toda la imagen se haya ido hacia la izquierda"
    }

    ctx.drawImage(floor, floorX, 512);
    ctx.drawImage(floor, floorX + floor.width, 512); // Dibujamos una segunda imagen del suelo "justo detrás de la anterior"
}

function drawBird() {
    var sprite = new Image();

    if (bird.src === "assets/sprites/yellowbird-midflap.png") {
        bird.src = "assets/sprites/yellowbird-downflap.png";
    } else if (bird.src === "assets/sprites/yellowbird-downflap.png") {
        bird.src = "assets/sprites/yellowbird-upflap.png";
    } else {
        bird.src = "assets/sprites/yellowbird-midflap.png";
    }

    sprite.src = bird.src; // Le asignamos a la variable sprite, la imagen que convenga para que el pajarito aletee

    ctx.drawImage(sprite, 50, 200);
}

function draw() {
    drawBg();
    drawFloor();
    drawBird();
}

// Game Loop
function run() {
    draw();
    window.requestAnimationFrame(run); // función recursiva para ejecutar lo que necesitemos (varios cuadros por segundo)
}

window.requestAnimationFrame(run);