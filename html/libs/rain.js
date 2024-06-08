let canvas = document.getElementsByClassName('rain')[0];
let c = canvas.getContext('2d');

// Function to resize the canvas to fit the window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial canvas size
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomNum(max, min) {
    return Math.random() * (max - min) + min;
}

function RainDrops(x, y, endy, velocity, opacity) {
    this.x = x;
    this.y = y;
    this.endy = endy;
    this.velocity = velocity;
    this.opacity = opacity;

    this.draw = function() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x, this.y - this.endy);
        c.lineWidth = 1;
        c.strokeStyle = "rgba(255, 255, 255, " + this.opacity + ")";
        c.stroke();
    }

    this.update = function() {
        let rainEnd = canvas.height + 100;
        if (this.y >= rainEnd) {
            this.y = this.endy - 100;
        } else {
            this.y += this.velocity;
        }
        this.draw();
    }
}

let rainArray = [];

function createRainDrops() {
    rainArray = [];
    let numDrops = Math.floor(window.innerWidth / 10); // Adjust the number of drops based on screen width
    for (let i = 0; i < numDrops; i++) {
        let rainXLocation = Math.random() * canvas.width;
        let rainYLocation = Math.random() * -500;
        let randomRainHeight = randomNum(10, 2);
        let randomSpeed = randomNum(20, 0.2);
        let randomOpacity = Math.random() * 0.55;
        rainArray.push(new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity));
    }
}

// Create initial rain drops
createRainDrops();

function animateRain() {
    requestAnimationFrame(animateRain);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < rainArray.length; i++) {
        rainArray[i].update();
    }
}

// Recreate rain drops on resize
window.addEventListener('resize', createRainDrops);

animateRain();