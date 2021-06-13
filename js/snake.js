const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// deteksi keyboard ditekan
document.addEventListener("keydown", direction);


// import image
const ground = new Image();
ground.src = "img/background.png";

const imgFood = new Image();
imgFood.src = "img/food.png";

// import audio
const nabrak = new Audio();
nabrak.src = "audio/mati.mp3";

const makan = new Audio();
makan.src = "audio/makan.mp3";

const belok = new Audio();
belok.src = "audio/belok.mp3";

// box
let box = 31;

// snake
let snake = [];
snake[0] = {
    x : 8*box,
    y : 10*box
}

// food
let food = {
    x : Math.floor(Math.random()*15+1) * box,
    y : Math.floor(Math.random()*15+3) * box,
}

// score
let score = 0;

// direction
let d;

// fungsi gambar
function draw() {
    ctx.drawImage(ground , 0, 0);

    // perulangan snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "yellow" : "white";
        // fillRect 
        ctx.fillRect(snake[i].x, snake[i].y,  box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box)  
    }

    // food
    ctx.drawImage(imgFood, food.x, food.y);

    // munculin score
    ctx.fillStyle = "white";
    ctx.font = "30px Helvetica";
    ctx.fillText(score, 3*box, 1.6*box);

    // munculin high score
    let nilaiTertinggi = localStorage.getItem("highscore");

    // saring score
    if (score > nilaiTertinggi) {
        localStorage.setItem("highscore", score);
    }

    // filter nilai awal
    if (nilaiTertinggi) {
        ctx.fillText(nilaiTertinggi, 6.5*box, 1.6*box);
    } else {
        ctx.fillText(0, 6.5*box, 1.6*box);
    }

    // posisi kepala awal
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d=="LEFT") snakeX -= box;
    if(d=="TOP") snakeY -= box;
    if(d=="RIGHT") snakeX += box;
    if(d=="DOWN") snakeY += box;

    // ketika food dimakan
    if (snakeX == food.x && snakeY == food.y) {
        makan.play();
        score++;
        food = {
            x : Math.floor(Math.random()*15+1) * box,
            y : Math.floor(Math.random()*15+3) * box, 
        }
    }else{
        snake.pop()
    }


    // posisi kepala baru
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // Game Over
    if(snakeX < box || snakeX > 15*box || snakeY < 3*box || snakeY > 17*box || tabrakan(newHead, snake)) {
        clearInterval(game);
        nabrak.play();
    }

    // nambahin nilai baru ke snake array
    snake.unshift(newHead);
}

// fungsi direction
function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") {
        belok.play();
        d = "LEFT";
    }else if(event.keyCode == 38 && d != "DOWN"){
        belok.play();
        d = "TOP";
    }else if(event.keyCode == 39 && d != "LEFT"){
        belok.play();
        d = "RIGHT";
    }else if(event.keyCode == 40 && d != "TOP"){
        belok.play();
        d = "DOWN";
    }
}

// fungsi tabrakan 
function tabrakan(kepala, buntut) {
    for (let i = 0; i < buntut.length; i++) {
        if(kepala.x == buntut[i].x && kepala.y == buntut[i].y){
            return true
        }
    }
    return false
}

// set interval
let game = setInterval(draw, 100);
