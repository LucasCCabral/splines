// DRAWING FUNCIOTNS----------------------------------------------------------------------------
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

function drawOrigPoints (){
	drawDot(inputPointx[0],inputPointy[0]);
	for(var z=1; z<=i;z++){
		color = 'black';
		drawDot(inputPointx[z],inputPointy[z]);
		drawLine(inputPointx[z-1],inputPointy[z-1],inputPointx[z],inputPointy[z]);
	}
}

function bezierCurve(L){
	var aux1 = new Dot(0,0);
	var aux2 = new Dot(0,0);
	var a,b,c,d,l,uaux;
	color = "red";
	for(var h = 0; h<3*L; h=h+3){
		for(var t = 0; t <=1 ; t+=0.001){
			l = 1-t;
			a = l**3;
			b = l**2;
			c = t**2;
			d = t**3;

			aux2.x = aux1.x;
		    aux2.y = aux1.y;

			aux1.x = d*controlPointx[h+3] + 3*c*(1-t)*controlPointx[h+2]+ 3*b*t*controlPointx[h+1] + a*controlPointx[h];
			aux1.y = d*controlPointy[h+3] + 3*c*(1-t)*controlPointy[h+2]+ 3*b*t*controlPointy[h+1] + a*controlPointy[h];
	    	
	    	if(t ===0 ){
			aux2.x = aux1.x;
		    aux2.y = aux1.y;
}
	    	drawLine(aux1.x,aux1.y,aux2.x,aux2.y);			
		}
	}
}
// ----------------------------------------------------------------------------------------


//BEZIER CALC. FUNCTIONS--------------------------------------------------------------------------

function stringSize(){
	var aux,strS;
	aux = inputPointx[i]-inputPointx[0];
	strS = inputPointy[i]-inputPointy[0];
	strS = Math.sqrt(strS**2+aux**2);
	u.push(strS);
}
function stringSizeChange(k){
	var aux,strS;
	aux = inputPointx[k]-inputPointx[0];
	strS = inputPointy[k]-inputPointy[0];
	strS = Math.sqrt(strS**2+aux**2);
	u[k-2] = (strS);
}

function controlPointJunction(i){
	var k1,k2;
	k1 = u[i-1]; //deltaUi-1
	k2 = u[i]; //deltaUi
	k3 = k1+k2;	
	controlPointx[3*i] = (k2/k3)*controlPointx[3*i-1]+(k1/k3)*controlPointx[3*i+1];
	controlPointy[3*i] = (k2/k3)*controlPointy[3*i-1]+(k1/k3)*controlPointy[3*i+1];
}

function farLeftHandPoint(i){
	var k1,k2,k3,k4;
	k1 = u[i]; //deltaUi
	k2 = u[i-1]; //deltaUi-1
	k3 = u[i-2]; //deltaUi-2
	k4 = k1+k2+k3;
	
	controlPointx[3*i-2] = ((k1+k2)/k4)*inputPointx[getRealIndex(i-1)] + (k3/k4)*inputPointx[getRealIndex(i)];// os inputs estão errados, eles
	controlPointy[3*i-2] = ((k1+k2)/k4)*inputPointy[getRealIndex(i-1)] + (k3/k4)*inputPointy[getRealIndex(i)];	
}

function leftHandPoint(i){
	var k1,k2,k3,k4;
	k1 = u[i]; //deltaUi
	k2 = u[i-1]; //deltaUi-1
	k3 = u[i-2]; //deltaUi-2
	k4 = k1+k2+k3;
	controlPointx[3*i-1] = (k1/k4)*inputPointx[getRealIndex(i-1)] + ((k3+k2)/k4)*inputPointx[getRealIndex(i)];
	controlPointy[3*i-1] = (k1/k4)*inputPointy[getRealIndex(i-1)] + ((k3+k2)/k4)*inputPointy[getRealIndex(i)];	
}

function rightHandExtremityPoint(){ 
	var L = getL(i);
	var k1,k2,k3;
	k1 = u[L-2];
	k2 = u[L-1];
	k3 = k1+k2;
	controlPointx[3*L-2] = (k1/k3)*inputPointx[getRealIndex(L)] + (k2/k3)*inputPointx[getRealIndex(L-1)];
	controlPointy[3*L-2] = (k1/k3)*inputPointy[getRealIndex(L)] + (k2/k3)*inputPointy[getRealIndex(L-1)];
}

function leftHandExtremityPoint(){
	var k1,k2;
	k1=u[0]; //u[0] => u0, u1 = u[1]
	k2=u[1];
	k3 = k1+k2;
	controlPointx[2] = (k1/k3)*inputPointx[2]+(k2/k3)*inputPointx[1];
	controlPointy[2] = (k1/k3)*inputPointy[2]+(k2/k3)*inputPointy[1];
}

function bezierCalculus(){
	var L;
	L = getL(i); //L=1 -> L==2, mas L=1 é o index verdadeiro ja
	//setting b0-b1
	controlPointx[0] = inputPointx[0];
	controlPointy[0] = inputPointy[0];
	controlPointx[1] = inputPointx[1];
	controlPointy[1] = inputPointy[1];
	//setting B3l
	controlPointx[3*L] = inputPointx[i];
console.log("d%d:(%d,%d) - b%d:(%d,%d)",-1,inputPointx[i],inputPointy[i-1],0,controlPointx[0],controlPointy[0]);
	controlPointy[3*L] = inputPointy[i];
	controlPointx[3*L-1] = inputPointx[i-1];
	controlPointy[3*L-1] = inputPointy[i-1];
	//setting B3L-1 ^ B2
	if(L>1){
		leftHandExtremityPoint();
		rightHandExtremityPoint();
	}
	for(var z=1 ; z<L; z++){
		if(z>1){
			leftHandPoint(z); //b3i-1
			farLeftHandPoint(z);//b3i-2
		}
		controlPointJunction(z); //b3i
	}

}


//-----------------------------------------------------------------------------------------------------------------------------------

// UTILITY FUNCTIONS
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

function getRealIndex(pos){
	return pos + 1;
}

function getPraticalIndex(index){
	return index-1;
}

function getL(index){
	return getPraticalIndex(index) - 1;
}


function isInCircle(click) {
	var vx,vy;
    for(var k=0; k<i;k++){
        vx = inputPointx[k] - click.x,
        vy = inputPointy[k] - click.y
		if(Math.sqrt(vx * vx + vy * vy) <= 15){
    		move = 1;
    		movingIndex = k;
		}
    }			
}


