function drawDot(){
ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = '5';
ctx.fillStyle = 'black';
ctx.arc(p1.x, p1.y, 3, 0, 2*Math.PI); 
ctx.stroke();
ctx.fill();
}

function drawLine(p1x,p1y,p2x,p2y){
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = '5';
	ctx.fillStyle = color;
	ctx.moveTo(p1x,p1y);
	ctx.lineTo(p2x,p2y);
	ctx.stroke();
}

function bezierCurve(){
	var aux1 = new Dot(0,0);
	var aux2 = new Dot(0,0);
	var x,y,a,b,c,d;
	color = "red";
	for(var t = 0; t <=1 ; t+=0.01){
		l = 1-t;
		a = Math.pow(l,3);
		b = Math.pow(l,2);
		c = Math.pow(t,2);
		d = Math.pow(t,3);

		x = a*inputPointx[i-3] + 3*b*t*inputPointx[i-2]+ 3*c*(1-t)*inputPointx[i-1] + d*inputPointx[i];
		y = a*inputPointy[i-3] + 3*b*t*inputPointy[i-2]+ 3*c*(1-t)*inputPointy[i-1] + d*inputPointy[i];

    	aux2.x = aux1.x;
    	aux2.y = aux1.y;
    	aux1.x = x;
    	aux1.y = y;
    	
    	if(t === 0 ){
    		aux2.x = aux1.x;
    		aux2.y = aux1.y;
    	}
    	drawLine(aux1.x,aux1.y,aux2.x,aux2.y);
	}
}
