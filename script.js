const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;

(function setup() {
    snake = new Snake();
    fruit = new Fruit();

    fruit.pickLocation();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }

        snake.checkCollision();
    }, 250);
}());

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale;
    this.ySpeed = 0;

    this.draw = function() {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(this.x, this.y, scale, scale);
    };

    this.update = function() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) this.x = 0;
        if (this.y >= canvas.height) this.y = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y < 0) this.y = canvas.height;
    };

    this.eat = function(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            return true;
        }
        return false;
    };

    this.checkCollision = function() {
        if (this.x < 0 || this.x >= canvas.width || this.y < 0 || this.y >= canvas.height) {
            alert("Game Over!");
            window.location.reload();
        }
    };
}

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    };

    this.draw = function() {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.x, this.y, scale, scale);
    };
}

window.addEventListener('keydown', (event) => {
    const direction = event.key.replace('Arrow', '');
    snake.changeDirection(direction);
});
