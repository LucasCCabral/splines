function resizeCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
}

function resizeToFit() {
    var width = parseFloat(window.getComputedStyle(canvas).width);
    var height = parseFloat(window.getComputedStyle(canvas).height);
    resizeCanvas(width, height);
}

function Dot(x,y){
   this.x=x;
   this.y=y;
}

function drawDot(){
ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = '5';
ctx.fillStyle = 'black';
//Draws the point
ctx.arc(p1.x, p1.y, 3, 0, 2*Math.PI); 
ctx.stroke();
ctx.fill();
}

function drawLine(){
	ctx.beginPath();
	ctx.strokeStyle = 'black';
	ctx.lineWidth = '5';
	ctx.fillStyle = 'black';
	ctx.moveTo(p1.x,p1.y);
	ctx.lineTo(p2.x,p2.y);
	ctx.stroke();
}

//descobrir como enviar um objeto para função, sem sser global
function drawLine1(){
	ctx.beginPath();
	ctx.strokeStyle = 'red';
	ctx.lineWidth = '5';
	ctx.fillStyle = 'red';
	ctx.moveTo(aux1.x,aux1.y);
	ctx.lineTo(aux2.x,aux2.y);
	ctx.stroke();
}

function bezierCurve(){
	var a;
	var b;
	var c;
	var d;
	for(var t = 0; t <=1 ; t+=0.01){
//console.log("t= "+t+"\n");
		//substituir esse trecho por uma função que envia t e retorna (x,y)
		l = 1-t;
		a = Math.pow(l,3);
		b = Math.pow(l,2);
		c = Math.pow(t,2);
		d = Math.pow(t,3);

		x = a*controlPointx[i-3] + 3*b*t*controlPointx[i-2]+ 3*c*(1-t)*controlPointx[i-1] + d*controlPointx[i];
		y = a*controlPointy[i-3] + 3*b*t*controlPointy[i-2]+ 3*c*(1-t)*controlPointy[i-1] + d*controlPointy[i];
    	//-----------------------------------------------------------------

    	aux2.x = aux1.x;
    	aux2.y = aux1.y;
    	aux1.x = x;
    	aux1.y = y;
    	
    	if(t === 0 ){
    		aux2.x = aux1.x;
    		aux2.y = aux1.y;
    	}

    	drawLine1();
	}
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
resizeToFit();
//colocar como variável local em bezeierCurve, assim que descobrir como enviar variáveis locais
var aux1 = new Dot(0,0);
var aux2 = new Dot(0,0);
//playing with arrays
var p1 = new Dot(0,0);
var p2 = new Dot(0,0);
var controlPointx = new Array;
var controlPointy = new Array;
var i = 0;
var j = 0;

canvas.addEventListener('mousedown', function(e) {
	p1.x=e.offsetX;
    p1.y=e.offsetY;
    controlPointx.push(p1.x);
    controlPointy.push(p1.y);
    if(i>0){
    	p2.x = controlPointx[j];
    	p2.y = controlPointy[j];
    	drawLine();
    }
//console.log("p1.x= " + p1.x + " " + "p1.y= " + p1.y);
//console.log("p2.x= " + " " + p2.x + "p2.y= "+ p2.y);    
    drawDot();    
    
    if(i%3 === 0){
    	for(var k = 0; k < controlPointx.length;k++){
    		console.log("p%d.x=" + controlPointx[k] + "p%d.y"+controlPointy[k] ,k,k);
    	}
    	bezierCurve();
    }
    
    j=i;
    i++;
});


