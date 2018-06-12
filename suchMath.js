function drawDot(p1x,p1y){
ctx.beginPath();
ctx.strokeStyle = 'black';
ctx.lineWidth = '5';
ctx.fillStyle = 'black';
ctx.arc(p1x, p1y, 15, 0, 2*Math.PI); 
ctx.stroke();
ctx.fill();
}

function drawLine(p1x,p1y,p2x,p2y){
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = '5';
	ctx.fillStyle = color;
	//esse move to está gerando
	ctx.moveTo(p1x,p1y);
	ctx.lineTo(p2x,p2y);
	ctx.stroke();
}

function bezierCurve(L){
	var aux1 = new Dot(0,0);
	var aux2 = new Dot(0,0);
	var a,b,c,d,l,uaux;
	color = "red";
	for(var h = 0; h<3*L; h=h+3){
//ta errado pq no caso base deveria ser bezier
//console.log("b%d:(%f,%f) b%d:(%f,%f) b%d:(%f,%f) b%d:(%f,%f)",h+3,controlPointx[h+3],controlPointy[h+3],h+2,controlPointx[h+2],controlPointy[h+2],h+1,controlPointx[h+1],controlPointy[h+1],h,controlPointx[h],controlPointy[h]);
		for(var t = 0; t <=1 ; t+=0.001){
			l = 1-t;
			a = l**3;
			b = l**2;
			c = t**2;
			d = t**3;

//sempre vai estar um atrasado, em tese sem discontinuidades
			aux2.x = aux1.x;
		    aux2.y = aux1.y;

			aux1.x = d*controlPointx[h+3] + 3*c*(1-t)*controlPointx[h+2]+ 3*b*t*controlPointx[h+1] + a*controlPointx[h];
			aux1.y = d*controlPointy[h+3] + 3*c*(1-t)*controlPointy[h+2]+ 3*b*t*controlPointy[h+1] + a*controlPointy[h];

//console.log("x(%f) = (%f,%f)",t,aux1.x,aux1.y);	    	
	    	if(t === 0 ){
	    		aux2.x = aux1.x;
	    		aux2.y = aux1.y;
	    	}
	    	
	    	//console.log("aux2 = (%f,%f) aux1 = (%f,%f)",aux2.x,aux2.y,aux1.x,aux1.y);
	    	drawLine(aux1.x,aux1.y,aux2.x,aux2.y);			
		}
	}
}
