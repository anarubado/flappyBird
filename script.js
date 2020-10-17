var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d') // Se debe estipular que trabajaremos nuestro lienzo en 2d

//ctx.fillStyle = "red"; // .fillStyle selecciona el color de relleno
//ctx.fillRect(0, 0, 480, 640) // .fillRect posiciona un cuadrado con las coordenadas que seleccionemos
// Params(x, y, width, height)
// .clearRect borra todo el lienzo

// Variables de inicialización
var GAME = {
    WIDTH: 288,
    HEIGHT: 624,
    GRAVITY: 6,
    INITIAL_DELAY: 200
}

var floorX = 0;

var bird = {
    src: "assets/sprites/yellowbird-midflap.png", // Iniciamos el dibujo del pajarito con las alas en el medio
    y: 200,
    flyingTime: 0,
    rotation: 0
}

var frames = 0;
var isGameOver = false;

// Funciones por cuadro
function drawBg() {
    var bg = new Image()
    bg.src = "assets/sprites/background-day.png"; // Imagen a renderizar
    ctx.drawImage(bg, 0, 0); // Dibuja la imagen en una posicion determinada
}

function drawFloor() {
    var floor = new Image()
    floor.src = "assets/sprites/base.png";
    
    floorX--; // Queremos que la imagen se mueva hacia la izquierda (la posición de x disminuirá)

    if (floorX < -floor.width) {
        floorX = 0; // Hacemos que se reinicie la variable cuando "toda la imagen se haya ido hacia la izquierda"
    }

    ctx.drawImage(floor, floorX, 512);
    ctx.drawImage(floor, floorX + floor.width, 512); // Dibujamos una segunda imagen del suelo "justo detrás de la anterior"
}

function updateBirdSprite() {
    if (bird.src === "assets/sprites/yellowbird-midflap.png") {
        bird.src = "assets/sprites/yellowbird-downflap.png";
    } else if (bird.src === "assets/sprites/yellowbird-downflap.png") {
        bird.src = "assets/sprites/yellowbird-upflap.png";
    } else {
        bird.src = "assets/sprites/yellowbird-midflap.png";
    }

    return bird.src;
}

function updateBirdPosition() {
    if (bird.flyingTime > 0) { // El tiempo de vuelo disminuirá
        bird.flyingTime--;
        bird.y -= 5; // Pajarito vuela hacia arriba
    } else {
        bird.y += GAME.GRAVITY; // Incrementamos la variable "y" según la gravedad que usemos en el juego. Cuanto más grande sea la gravedad, más rápido bajará el pajarito    
    } // Si no presionamos la tecla y hacemos volar al pajarito, éste caerá debido a la gravedad

    if (bird.rotation < 90) {
        bird.rotation += 10;
    }
}

function drawBird() {
    var sprite = new Image();

    if (frames % 4 === 0) { // Cada 4 cuadros que pasen, actualizaremos la imagen del pajarito (esto es para ralentizarlo)
        updateBirdSprite(); // Retorna la imagen a renderizar
    }

    if (frames > GAME.INITIAL_DELAY) { // El pajarito volará un tiempo y luego quedarán sus movimientos en nuestra responsabilidad 
        updateBirdPosition();
    }    
    
    sprite.src = bird.src; // Le asignamos a la variable sprite, la imagen a renderizar que convenga para que el pajarito aletee
    
    if (bird.y + sprite.height > GAME.HEIGHT - 112) { // Cuando el pajarito caiga al suelo, es game over
        isGameOver = true;
    }

    ctx.save();
    ctx.translate(50 + sprite.width / 2, bird.y + sprite.height / 2); // Colocamos el punto de rotación en el medio del pajarito

    ctx.rotate(Math.PI / 180 * bird.rotation);
    ctx.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
    ctx.restore();
}

function fly() {
    if (frames > GAME.INITIAL_DELAY) {
        bird.flyingTime = 10; // Cada vez que se toque la tecla, el pajarito tendrá cierto "impulso" y volará un determinado tiempo
        bird.rotation = -20;
    }
  
}

function drawGameOver() {
    var gameOver = new Image()
    gameOver.src = "assets/sprites/gameover.png"; // Imagen a renderizar
    ctx.drawImage(gameOver, (GAME.WIDTH - gameOver.width) / 2, (GAME.HEIGHT - gameOver.height) / 2); // Dibuja la imagen en una posicion determinada
}

function draw() {
    drawBg();
    drawFloor();
    drawBird();
}

// Game Loop - Bucle principal
function run() {
    if (!isGameOver) {
        frames++ // Seteamos una variable llamada frames (cuadros) que se va a ir incrementando según el número de cuadros que se ejecuten
        draw();
        window.requestAnimationFrame(run); // Función recursiva para ejecutar lo que necesitemos (varios cuadros por segundo)
    } else {
        drawGameOver();
        window.requestAnimationFrame(run); // Función recursiva para ejecutar lo que necesitemos (varios cuadros por segundo)
    }
}

window.requestAnimationFrame(run);
window.addEventListener("keypress", fly);

// Guía de rotación de elementos

//ctx.save(); // Se guarda el canvas en su estado actual
//ctx.translate(40 + 100 / 2, 40 + 100 / 2) // Cambiamos el punto de rotación (si no lo hacemos se toma como referencia el punto medio del canvas)
//ctx.rotate(Math.PI / 180 * 45); // Se rota el canvas (admite las unidades en radianes pero las podemos cambiar a grados)
//ctx.fillStyle = "red";
//ctx.fillRect(-100 / 2, -100 / 2, 100, 100); // El cuadrado se dibuja según el punto de rotación
//ctx.restore(); // Se vuelve a la previa situación
//ctx.fillStyle = "blue";
//ctx.fillRect(100, 100, 100, 100);