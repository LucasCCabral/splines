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

//se pa o calulo do deltaU esta errado, pois desse jeito b3l-2 pode ser (0,0)
function stringSize(){
	var aux,strS;
	aux = inputPointx[i]-inputPointx[0];
	strS = inputPointy[i]-inputPointy[0];
	strS = Math.sqrt(strS**2+aux**2);
	u.push(strS);
//console.log("P%d(%d,%d) P%d(%d,%d)",i,inputPointx[i],inputPointy[i],0,inputPointx[0],inputPointy[0]);
//console.log("deltaU%d:%d ",i-3,strS);
}


function controlPointJunction(i){
	var k1,k2;
	k1 = u[i-1]; //deltaUi-1
	k2 = u[i]; //deltaUi
	k3 = k1+k2;	
	controlPointx[3*i] = (k2/k3)*controlPointx[3*i-1]+(k1/k3)*controlPointx[3*i+1];
	controlPointy[3*i] = (k2/k3)*controlPointy[3*i-1]+(k1/k3)*controlPointy[3*i+1];
}

//esse é o calculo do b3i-2
function farLeftHandPoint(i){
	var k1,k2,k3,k4;
	k1 = u[i]; //deltaUi
	k2 = u[i-1]; //deltaUi-1
	k3 = u[i-2]; //deltaUi-2
	k4 = k1+k2+k3;
	
	controlPointx[3*i-2] = ((k1+k2)/k4)*inputPointx[getRealIndex(i-1)] + (k3/k4)*inputPointx[getRealIndex(i)];// os inputs estão errados, eles
	controlPointy[3*i-2] = ((k1+k2)/k4)*inputPointy[getRealIndex(i-1)] + (k3/k4)*inputPointy[getRealIndex(i)];	
}

//esse é o calculo do b3i-1
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
	// esse tbm vai estar certo
	var L = getL(i);
	var k1,k2,k3;
	//checar se esse calculo está coerente
	k1 = u[L-2];
	k2 = u[L-1];
	k3 = k1+k2;
	controlPointx[3*L-2] = (k1/k3)*inputPointx[getRealIndex(L)] + (k2/k3)*inputPointx[getRealIndex(L-1)];
	controlPointy[3*L-2] = (k1/k3)*inputPointy[getRealIndex(L)] + (k2/k3)*inputPointy[getRealIndex(L-1)];
}

function leftHandExtremityPoint(){
	//esse ta certo pq coloquei direto
	var k1,k2;
	k1=u[0]; //u[0] => u0, u1 = u[1]
	k2=u[1];
	k3 = k1+k2;
	controlPointx[2] = (k1/k3)*inputPointx[2]+(k2/k3)*inputPointx[1];
	controlPointy[2] = (k1/k3)*inputPointy[2]+(k2/k3)*inputPointy[1];
//console.log("d1:(%d,%d)",inputPointx[2],inputPointy[2]);
//console.log("d0:(%d,%d)",inputPointx[1],inputPointy[1]);
//console.log("k1: %d k2: %d k3:%d",k1,k2,k3);
}

function bezierCalculus(){
	var L;
	L = getL(i); //L=1 -> L==2, mas L=1 é o index verdadeiro ja
	//setting b0-b1
	controlPointx[0] = inputPointx[0];
	controlPointy[0] = inputPointy[0];
	controlPointx[1] = inputPointx[1];
	controlPointy[1] = inputPointy[1];
//console.log("d%d:(%d,%d) - b%d:(%d,%d)",-1,inputPointx[0],inputPointy[0],0,controlPointx[0],controlPointy[0]);
	//setting B3l
	controlPointx[3*L] = inputPointx[i];
	controlPointy[3*L] = inputPointy[i];
	controlPointx[3*L-1] = inputPointx[i-1];
	controlPointy[3*L-1] = inputPointy[i-1];
	//setting B3L-1 ^ B2
	if(L>1){
		leftHandExtremityPoint();
		rightHandExtremityPoint();
	}

//-------------------------------Não esta calculando direito o b3i pois o b4 ainda n foi calculado, la esta um valor passado
	for(var z=1 ; z<L; z++){
		if(z>1){
			leftHandPoint(z); //b3i-1
			farLeftHandPoint(z);//b3i-2
		}
		controlPointJunction(z); //b3i
	}

}

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
var i = 0,j = 0;

canvas.addEventListener('mousedown', function(e) {
	p1.x=e.offsetX;
    p1.y=e.offsetY;
    inputPointx.push(p1.x);
    inputPointy.push(p1.y);
    if(i>0){
    	p2.x = inputPointx[j];
    	p2.y = inputPointy[j];
    	color = "black";
    	drawLine(p1.x,p1.y,p2.x,p2.y);
    }

    if(i>=3){
    	stringSize();
    	bezierCalculus();
    	L = getL(i);
    	//i =3, L = 3-2 -> 1;
    	bezierCurve(L);

/*console.log("L=%d",L);
for(var h=0;h<=3*L;h++){
console.log("B%d:(%f,%f), ",h,controlPointx[h],controlPointy[h]);
}
for(var h =0; h <=i;h++){
console.log("d%d:(%f,%f), ",h-1,inputPointx[h],inputPointy[h]);	
}*/
  }
    drawDot();    
    j=i;
    i++;
});