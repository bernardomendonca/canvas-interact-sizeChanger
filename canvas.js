// SETTING UP THE CANVAS

var canvas = document.querySelector("canvas");
canvas.width =window.innerWidth;
canvas.height =window.innerHeight;
var c = canvas.getContext('2d');

// VARIABLES
var mouse = {
	x: undefined,
	y: undefined};
var maxRadius = 40;
var minRadius = 2;
var colorArray = [
	'#A3B5BF',
	'#6C787F',
	'#D9F2FF',
	'#363D40',
	'#C3D9E5'];
// HESHA BLUES
var circleArray = [];

// EVENT LISTENERS
window.addEventListener('mousemove', function(event){
	// Extracting the mouse coordinates
	mouse.x = event.x;
	mouse.y = event.y;
});
window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
})

// FUNCTIONS

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

function init() {
	circleArray = [];
	for (var i = 0; i < 800; i++) {
		var radius = Math.random() * 3 + 1;
		// To make sure that the circles wont be stuck in the borders:
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5) * 3;
		var dy = (Math.random() - 0.5) * 3;
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}	
}

function animate() {
	requestAnimationFrame(animate);
	// Clearing the canvas, otherwise there would be lots of circles being drawn and 'draged' through the screen
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
};

// INIT + ANIMATE

init();
animate();