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

function deltaU (i){
	return (u[i-3] - u[i-4])/(u[i-3]+u[i-4]);
}
//se pa o calulo do deltaU esta errado, pois desse jeito b3l-2 pode ser (0,0)
function stringSize(){
	var aux,strS;
	aux = inputPointx[i]-inputPointx[i-1];
	strS = inputPointy[i]-inputPointy[i-1];
	strS = Math.sqrt(Math.pow(strS,2)+Math.pow(aux,2));
	u.push(strS);
//console.log("P%d(%d,%d) P%d(%d,%d)",i-1,inputPointx[i-1],inputPointy[i-1],i,inputPointx[i],inputPointy[i]);
//console.log("deltaU%d:%d ",i-3,strS);
}


function controlPointJunction(jNmber){
	var z,k1,k2,k3;
	z = getL(i)*3-3; 
	//jNmber é um npumero que indica qual junção eu quero de traz para frente
	// 3*i é o fim de um curva de bezier logo, u[i-4] ^ e u[i-5] serão os usados nesse caso.
	controlPointx[z] = (k1/k3)*controlPointx[z-1]+(k2/k3)*controlPointx[z+1];
	controlPointy[z] = (k1/k3)*controlPointy[z-1]+(k2/k3)*controlPointy[z+1];
}

//esse é o calculo do b3i-2
function leftHandPoint(){
	var z,k1,k2,k3,k4; // os k's ainda precisam ser calculados
	z = getL(i)*3 - 3; // vai retornar exatamente o que eu preciso
		//z = 3*i-2;
	controlPointx[3*z-2] = inputPointx[z-1] + inputPointx[z];// os inputs estão errados, eles
	controlPointy[3*z-2] = inputPointy[z-1] + inputPointy[z];	
}

//esse é o calculo do b3i-1
function leftHandMiddlePoint(){
	var z;
	z = getL(i)*3 - 3; 
	controlPointx[3*z-1] = inputPointx[z-1] + inputPointx[z];
	controlPointy[3*z-1] = inputPointy[z-1] + inputPointy[z];	
}

// esse é o calculo do b3l-2, apenas.
function rightHandExtremityPoint(){ 
//uL => u[i-3]
//#todo fix o calculo dos u's
	var L = getL(i);
	var k1,k2;
	k1 = deltaU(i-1);
	k2 = deltaU(i);
	controlPointx[3*L-2] = k1*inputPointx[getRealIndex(L)] + k2*inputPointx[getRealIndex(L-1)];
	controlPointy[3*L-2] = k1*inputPointy[getRealIndex(L)] + k2*inputPointy[getRealIndex(L-1)];
//console.log("inputPoint1:(%d,%d) inputPoint2:(%d,%d)",inputPointx[getRealIndex(L)],inputPointy[getRealIndex(L)],inputPointx[getRealIndex(L-1)],inputPointy[getRealIndex(L-1)] )
//console.log("u[%d]:%d u[%d]:%d",i-3,u[i-3],i-4,u[i-4]);
}
function convertToControlPoint(){
	controlPointx.push(inputPointx[i]);
	controlPointy.push(inputPointy[i]);
//before i ===3, it's the trivial case where the spline points are equal to  the simple bezier points
	if(i>=3){
		stringSize();
		if(i>3){
			rightHandExtremityPoint();
			leftHandMiddlePoint();
			controlPointJunction(); 
			leftHandPoint();		
		}
	}		

}

/*
O "tamanho" da corda está certo?
Devo dar push sempre no rightHandExtremity point? ou basta dar igual na posição? 



*/
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
resizeToFit();
var p1 = new Dot(0,0);
var p2 = new Dot(0,0);
var controlPointx = new Array;
var controlPointy = new Array;
var inputPointx = new Array;
var inputPointy = new Array;
var u = new Array; // o vetor vai guardar o tamanho da corda
var i = -1,j = 0;


for(i = 0 ; i<5 ; i++){
	inputPointx.push(i);
	inputPointy.push(i);
	if(i === 2){
		inputPointx[2] = 0;
		inputPointy[2] = 0;

	}
	if(i === 3){
		inputPointx[3] = 3;
		inputPointy[3] = 4;	
	}
	if(i === 4){
		inputPointx[4] = 6;
		inputPointy[4] = 8;	
	}
	convertToControlPoint();
 	console.log("inputPoint:(%d,%d)" + "controlPoint:(%d,%d)",inputPointx[i],inputPointy[i],controlPointx[i],controlPointy[i])
}
/*
L= getL();//debbug code
for(i=0. i<3*L;i++){
	console.log("controlPoint:(%d,%d)",inputPointx[i],inputPointy[i]);
	console.log("u[%d]:%d",i,u[i]);
}*/



/*
controlPointy(-1)
controlPointy[l]-> l=l+1
controlPointy[-1]-> controlPointy[0]
canvas.addEventListener('mousedown', function(e) {
	p1.x=e.offsetX;
    p1.y=e.offsetY;
    inputPointx.push(p1.x);
    inputPointy.push(p1.y);
    convertToControlPoint();
    if(i>0){
    	p2.x = inputPointx[j];
    	p2.y = inputPointy[j];
    	color = "black";
    	drawLine(p1.x,p1.y,p2.x,p2.y);
    }
    drawDot();    
    j=i+1;
    i++;
});*/