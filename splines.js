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

//gets the real index for inputPoint, i'll send -1 and it'll give me 0 for example
//beware cause it does not work for all controlPoint, cuz control point is already right

function getRealIndex(pos){
	return pos + 1;
}

function getPraticalIndex(index){
	return index-1;
}

function getL(){
	return getPraticalIndex(i) - 1;
}
/*calculo dos u's está funcionando*/
function stringSize(){
	var aux,strS;// os k's estão sendo calculados de forma errada
	aux = inputPointx[i]-inputPointx[i-1];
	strS = inputPointy[i]-inputPointy[i-1];
	strS = Math.sqrt(Math.pow(strS,2)+Math.pow(aux,2)); // essa é a ultima distancia
	u.push(strS);
//console.log("P%d(%d,%d) P%d(%d,%d)",i-1,inputPointx[i-1],inputPointy[i-1],i,inputPointx[i],inputPointy[i]);
//console.log("deltaU%d:%d ",i-3,strS);
}


function controlPointJunction(jNmber){
	var z,k1,k2,k3;
	z = getL()*3-jNmber; //jNmber é um npumero que indica qual junção eu quero de  traz para frente;
	controlPointx[z] = (k1/k3)*controlPointx[z-1]+(k2/k3)*controlPointx[z+1];
	controlPointy[z] = (k1/k3)*controlPointy[z-1]+(k2/k3)*controlPointy[z+1];
}

function leftHandPoint(){
	var z,k1,k2,k3,k4; // os k's ainda precisam ser calculados
	z = getL()*3 - 3; // vai retornar exatamente o que eu preciso
		//z = 3*i-2;
	
	controlPointx[3*z-2] = inputPointx[z-1] + inputPointx[z];// os inputs estão errados, eles
	controlPointy[3*z-2] = inputPointy[z-1] + inputPointy[z];	
}

function leftHandMiddlePoint(){
	var z,k1,k2,k3,k4; // os k's ainda precisam ser calculados
	z = getL()*3 - 3; // z é o equivalente de 3*i-3 ou seja o 3i logo atras de 3L
	controlPointx[3*z-2] = inputPointx[z-1] + inputPointx[z];
	controlPointy[3*z-2] = inputPointy[z-1] + inputPointy[z];	
}

function rightHandExtremityPoint(){
//--------------codigo não testado, lembrar de testar-------------
	
//	controlPointx[3*L-2] = (k1/k3)*inputPointx[getRealIndex(L)] + (k2/k3)*inputPointx[getRealIndex(L-1)];
//	controlPointy[3*L-2] = (k1/k3)*inputPointy[getRealIndex(L)] + (k2/k3)*inputPointy[getRealIndex(L-1)];
}

function convertToControlPoint(){
	//pontos B3l e B3l-1 sempre atualizados
	controlPointx.push(inputPointx[i]);
	controlPointy.push(inputPointy[i]);

	if(i>=3){
		stringSize();
		rightHandExtremityPoint();
		/*leftHandMiddlePoint();
		controlPointJunction(); 
		leftHandPoint();*/
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