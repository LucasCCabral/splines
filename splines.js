function resizeCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
}

function resizeToFit() {
    var width = parseFloat(window.getComputedStyle(canvas).width);
    var height = parseFloat(window.getComputedStyle(canvas).height);
    resizeCanvas(width, height);
}

/*this version is stable but not working correctly in my web browser,to test this
simulate it on the PG classroom article.*/

function Dot(x,y){
   this.x=x;
   this.y=y;
}

function drawDot(){
ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = '5';
ctx.fillStyle = 'black';
ctx.arc(p1.x, p1.y, 3, 0, 2*Math.PI); 
ctx.stroke();
ctx.fill();
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var p1 = new Dot(0,0);
resizeToFit();

canvas.addEventListener('mousedown', function(e) {
	p1.x=e.offsetX;
    p1.y=e.offsetY;
    drawDot();
});