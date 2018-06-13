var canvas = document.querySelector("canvas");

canvas.width =window.innerWidth;
canvas.height =window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// // c.fillRect (x, y, width, height)
// c.fillRect (100, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect (400, 100, 100, 100);
// c.fillRect (400, 300, 100, 100);

//  c = CONTEXT

// LINE
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.strokeStyle = "#aaaaaa";
// c.stroke();

// // ARC / CIRCLE
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();


// for (var i = 0; i < 1000; i++) {
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
// 	// Math.random gives a value between 0 and 1.
// 	c.beginPath();
// 	c.arc(x, y, 30, 0, Math.PI * 2, false);
// 	c.strokeStyle = "blue";
// 	c.stroke();
// };


// Creating the MOUSE object, with X and Y coordinates
var mouse = {
	x: undefined,
	y: undefined
};

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
	'#f6f6f6',
	'#a2a2a2',
	'#g2g2g2',
	'#e1e1e1',
	'#b5b5b5'
];

window.addEventListener('mousemove', function(event){
	// Extracting the mouse coordinates
	mouse.x = event.x;
	mouse.y = event.y;
});


// // Generating Random Color, in a gray(ish)scale
// function randomColor(){
// 	//pick a "red" from 0 to 100
// 	var r = Math.floor(Math.random() * 100);
// 	//pick a "green" from 0 to 100
// 	var g = Math.floor(Math.random() * 100);
// 	//pick a "blue" from 0 to 100
// 	var b = Math.floor(Math.random() * 100);
// 	// Using weights to guarantee the gray(ish)scale
// 	"rgb(r, g, b)"
// 	return "rgb(" + (r)*0.3 + ", " + (g)*0.59 + ", " + (b)*0.11 + ")";
// }

function Circle(x, y, dx, dy, radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();	
		// c.stroke();
		// c.strokeStyle = "steelBlue";
	}

	this.update = function() {
		// Everytime the object hit the borders, it bounces back:
		if (this.x + this.radius > innerWidth || 
			this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || 
			this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		// Velocity -> speed that something moves in a particular direction
		this.x += this.dx;
		this.y += this.dy;

		// Interacting:
		// Picking everything that is within 50px from the cursor
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
				if (this.radius < maxRadius) {
					this.radius += 1;				
				}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}
		// Calling the draw function:	
		this.draw();
	}
}

var circleArray = [];

for (var i = 0; i < 100; i++) {
	var radius = Math.random() * 3 + 1;
	// To make sure that the circles wont be stuck in the borders:
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var dx = (Math.random() - 0.5) * 3;
	var dy = (Math.random() - 0.5) * 3;
	circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
	requestAnimationFrame(animate);
	// Clearing the canvas, otherwise there would be lots of circles being drawn and 'draged' through the screen
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
};

animate();