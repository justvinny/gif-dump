class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    move() {
        let xStart = 0;
        let yStart = 0;
        let xEnd = window.innerWidth;
        let yEnd = window.innerHeight;

        if ((this.x - this.size) <= xStart) {
            this.velX = Math.abs(this.velX);
        }

        if ((this.x + this.size) >= xEnd) {
            this.velX = -this.velX;
        }

        if ((this.y - this.size) <= yStart) {
            this.velY = Math.abs(this.velY);
        }

        if ((this.y + this.size) >= yEnd) {
            this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;

    }

    collisionDetection(balls) {
        for (ball of balls) {
            if (!(this === ball)) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    // this.velX = -this.velX;
                    // this.velY = -this.velY;
                    // ball.velX = -ball.velX;
                    // ball.velY = -ball.velY;
                    this.color = randomColor();
                    ball.color = randomColor();
                }
            }
        }
    }
}

class EvilBall extends Ball {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY, color, size);
        this.movement = [false, false, false, false];
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    keyPress() {
        let _this = this;
        window.onkeydown = (e) => {
            switch (e.key) {
                case "ArrowDown":
                    _this.movement[0] = true;
                    break;
                case "ArrowUp":
                    _this.movement[1] = true;
                    break;
                case "ArrowRight":
                    _this.movement[2] = true;
                    break;
                case "ArrowLeft":
                    _this.movement[3] = true;
                    break;
            }
        };

        window.onkeyup = (e) => {
            switch (e.key) {
                case "ArrowDown":
                    _this.movement[0] = false;
                    break;
                case "ArrowUp":
                    _this.movement[1] = false;
                    break;
                case "ArrowRight":
                    _this.movement[2] = false;
                    break;
                case "ArrowLeft":
                    _this.movement[3] = false;
                    break;
            }
        };
    }

    move() {
        let xStart = 0;
        let yStart = 0;
        let xEnd = window.innerWidth;
        let yEnd = window.innerHeight;

        if (this.movement[0] && (this.y + this.size) <= yEnd) {
            this.y += this.velY;
        }

        if (this.movement[1] && (this.y - this.size) >= yStart) {
            this.y -= this.velY;
        }

        if (this.movement[2] && (this.x + this.size) <= xEnd) {
            this.x += this.velX;
        }

        if (this.movement[3] && (this.x - this.size) >= xStart) {
            this.x -= this.velX;
        }
    }

    collisionDetection(balls) {
        for (let i = 0; i < balls.length; i++) {
            if (!(this === balls[i])) {
                const dx = this.x - balls[i].x;
                const dy = this.y - balls[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[i].size) {
                    const score = document.querySelector("h1");
                    score.textContent = "Score: " + (parseInt(score.textContent.match(/\d+/)) + 1);
                    balls.splice(i, 1);
                }

                if (balls.length <= 0) {
                    for (ball of createBalls()) {
                        balls.push(ball);
                    }
                }
            }
        }
    }
}
function loop(evilBall, balls, ctx) {
    // ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(0, 0, 0, .25)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // Draw player ball.
    evilBall.draw(ctx);
    evilBall.move();
    evilBall.collisionDetection(balls);

    // Draw other balls.
    for (ball of balls) {
        ball.draw(ctx);
        ball.move();
        ball.collisionDetection(balls);
    }

    requestAnimationFrame(() => loop(evilBall, balls, ctx));
}

// function to generate random number
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function createBalls() {
    let balls = [];

    for (let i = 0; i < 25; i++) {
        balls.push(new Ball(random(20, window.innerWidth - 20),
            random(20, window.innerHeight - 20),
            random(1, 10),
            random(1, 10),
            randomColor(),
            random(10, 30)));
    }

    return balls;
}

function randomColor() {
    let r = Math.random() * 200;
    let g = Math.random() * 200;
    let b = Math.random() * 200;
    return `rgb(${r},${g},${b})`;
}



// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const evilBall = new EvilBall(100, 100, 10, 10, 'white', 30);
evilBall.keyPress();

let balls = createBalls();
loop(evilBall, balls, ctx);

window.onresize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
};

let touchHeld = false;
canvas.addEventListener("pointerdown", () => {
    touchHeld = true;
});

canvas.addEventListener("pointerup", () => {
    touchHeld = false;
});

canvas.addEventListener("pointermove", (event) => {
    if (touchHeld) {
        evilBall.x = event.clientX;
        evilBall.y = event.clientY;
    }
});