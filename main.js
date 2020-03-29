document.addEventListener('keydown', control)
const LEFT   = "left", 
      TOP    = "top", 
      RIGHT  = "right", 
      DOWN   = "down";
var canvas = document.getElementById('game'),
    ctx = canvas.getContext("2d"),
    tile = 20,
    totalTiles = canvas.width / tile,
    snake = new Snake((canvas.width / tile) / 2, (canvas.height / tile) / 2),
    food,
    x = setInterval(draw, 200);

generateFood();

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (snake.checkSelf()) {
        alert("Game over!");
        clearInterval(x);
    }
    snake.update();
    snake.show();
    ctx.fillStyle = "violet";
    ctx.fillRect(food.x * tile, food.y * tile, tile, tile);
    if(snake.eat(food)){
        generateFood();
    }
}

function control(event) {
    switch(event.keyCode){
        case 37:
            snake.move(LEFT);
            break;

        case 38:
            snake.move(TOP);
            break;

        case 39:
            snake.move(RIGHT);
            break;

        case 40:
            snake.move(DOWN);
            break;
    }
}

function generateFood() {
    do{
        food = {
            x: Math.floor(Math.random() * tile),
            y: Math.floor(Math.random() * tile)
        }
        let found = false;
        for(let i = 0; i < snake.body.length; i++){
            if(snake.body[i].x == food.x && snake.body[i].y == food.y){
                found = true;
            }
        }
        if(!found)
            break;
    }while(true);
}