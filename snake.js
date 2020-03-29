class Snake {
    constructor(x, y) {
        this.body = [
                {
                    x: x,
                    y: y
                },
                {
                    x: x - 1,
                    y: y
                },
                {
                    x: x - 2, 
                    y: y
                }
            ];
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.direction = RIGHT;
    }

    show(){
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillStyle = i == 0 ? "#880808": "#f8f8f8";
            ctx.fillRect(this.body[i].x * tile, this.body[i].y * tile, tile , tile);
            ctx.strokeStyle = "#000000"
            ctx.rect(this.body[i].x * tile, this.body[i].y * tile, tile, tile);
            ctx.stroke();
        }
    }

    checkSelf() {
        for (let i = 4; i < this.body.length; i++) {
            if (this.body[0].x == this.body[i].x  && this.body[0].y == this.body[i].y) {
                this.xSpeed = this.ySpeed = 0;
                return true;
            }
        }
        return false;
    }

    update() {
        let newX = this.body[0].x;
        let newY = this.body[0].y;

        if (this.body[0].x > totalTiles - 1) {
            newX = -1;
        }
        if (this.body[0].x < 0) {
            newX = totalTiles;
        }
        if (this.body[0].y > totalTiles - 1) {
            newY = -1;
        }
        if (this.body[0].y < 0) {
            newY = totalTiles;
        }
        newX += this.xSpeed;
        newY += this.ySpeed
        
        this.body.unshift({x: newX, y: newY})
        this.body.pop();
    }

    move(dir){
        
        switch(dir){
            case LEFT:
                if (this.direction != RIGHT) {
                    this.xSpeed = -1;
                    this.ySpeed = 0;
                    this.direction = dir;
                }
                break;

            case TOP:
                if (this.direction != DOWN) {
                    this.xSpeed = 0;
                    this.ySpeed = -1;
                    this.direction = dir;
                }
                break;

            case RIGHT:
                if (this.direction != LEFT) {
                    this.xSpeed = 1;
                    this.ySpeed = 0;
                    this.direction = dir;
                }
                break;

            case DOWN:
                if (this.direction != TOP) {
                    this.xSpeed = 0;
                    this.ySpeed = 1;
                    this.direction = dir;
                }
                break;
        }
    }

    eat(food){
        if(this.body[0].x == food.x && this.body[0].y == food.y){
            this.body.push(this.body[this.body.length - 1]);
            return true;
        }
        return false;
    }
}
