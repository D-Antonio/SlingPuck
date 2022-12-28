/*

 OOO OOO OOO OOO O  O O O
 O O O   O O  O  O O  O O
 OOO OOO OOO  O  OO    O
 O   O   OO   O  O O   O
 O   OOO O O OOO O  O  O
  
*/


var lastUpdate=0;
var per;
var per1;
var currentFps=0;
var frameCount=0;
var lasFrame=0;
var p1={x:0, y:0, bola:null, down:false};
var d1, d2;
var p2={x:0, y:0, bola:null, down:false};
var ret=true;
var th0 = { x:0, y:0, down:false, getExtremePoint:function() { return [this.x, this.y]; } }
var th1 = { x:0, y:0, down:false, getExtremePoint:function() { return [this.x, this.y]; } }
var toush;
class ConvexShape2D {
	constructor() {}

	collide(shape, d) {
	//console.log(shape);
	  var a = this.getExtremePoint(d[0], d[1]);
	  var b = shape.getExtremePoint(-d[0], -d[1])
	  var p = [a[0] - b[0], a[1] - b[1]];
	  if (p[0] * d[0] + p[1] * d[1] < 0) return false;
	  var c = false;
	  var s = [[p[0], p[1]]];
	  d = [-p[0], -p[1]];
	  while(true) {
	    a = this.getExtremePoint(d[0], d[1]);
	    b = shape.getExtremePoint(-d[0], -d[1]);
	    p = [a[0] - b[0], a[1] - b[1]];
	    if (p[0] * d[0] + p[1] * d[1] < 0) return false;
	    let tc = Boolean(s[0][0] * p[1] - s[0][1] * p[0] < 0);
	    if (s.length == 1) c = tc;
	    else if (c == tc) {
	      tc = Boolean(p[0] * s[1][1] - p[1] * s[1][0] < 0);
	      if (c == tc) return true;// collision!
	      else {// no collision 
	        s.shift(); tc = c;
	      }
	    } else {
	      c = tc; s.pop();
	    }
	    if (tc) {
	      d[0] = p[1] - s[0][1];
	      d[1] = s[0][0] - p[0];
	    } else {
	      d[0] = s[0][1] - p[1];
	      d[1] = p[0] - s[0][0];
	    }
	    s.unshift(p);
	  }

	}

}

class Circle extends ConvexShape2D {

constructor(x, y, a, m, b1, k, b2, dv) {
  super();
  this.x = x; this.y = y; this.b1 = b1; this.a = a; this.r = ((((context.canvas.width/2)/2)/2)/2);
  this.m=m; this.k=k; this.b2=b2; this.dv=dv;
}

getExtremePoint(vx, vy) {
  var d = Math.atan2(vy, vx);
  vx = Math.cos(d) * this.r;
  vy = Math.sin(d) * this.r;
  return [this.x + vx, this.y + vy];

}


}

var context = document.getElementById("canvas").getContext("2d");
function resize() {
	if ((document.documentElement.clientHeight/2)>document.documentElement.clientWidth) {
        context.canvas.width=document.documentElement.clientWidth;
        context.canvas.height=document.documentElement.clientWidth*2;
	} else{
		context.canvas.width=document.documentElement.clientHeight/2;
		context.canvas.height=document.documentElement.clientHeight;
	}
}
resize();

var linex=context.canvas.width/2;
var liney=((context.canvas.height)-((context.canvas.height/4)/2));

var linex1=context.canvas.width/2;

var liney1=((context.canvas.height/4)/2);

var shapes = [new Circle( (((context.canvas.width/2)/2)/2), (context.canvas.height/2+(((context.canvas.width/2)/2)/2)), 20, 0, 0, 1, 0, 1), new Circle((((context.canvas.width/2)/2)/2), (context.canvas.height/2+((((context.canvas.width/2)/2)/2)*3)), 20, 0, 0, 2, 0, 1), new Circle((((context.canvas.width/2)/2)/2), (context.canvas.height/2+((((context.canvas.width/2)/2)/2)*5)), 20, 0, 0, 3, 0, 1), new Circle((context.canvas.width-(((context.canvas.width/2)/2)/2)), (context.canvas.height/2+(((context.canvas.width/2)/2)/2)), 20, 0, 0, 4, 0, 1), new Circle((context.canvas.width-(((context.canvas.width/2)/2)/2)), (context.canvas.height/2+((((context.canvas.width/2)/2)/2)*3)), 20, 0, 0, 5, 0, 1), new Circle((context.canvas.width-(((context.canvas.width/2)/2)/2)), (context.canvas.height/2+((((context.canvas.width/2)/2)/2)*5)), 20, 0, 0, 6, 0, 1), new Circle(((((context.canvas.width/2)/2)/2)*4), (context.canvas.height/2+((((context.canvas.width/2)/2)/2)*5)), 20, 0, 0, 7, 0, 1), new Circle( (((context.canvas.width/2)/2)/2), (context.canvas.height/2-(((context.canvas.width/2)/2)/2)), 20, 0, 8, 0, 1), new Circle((((context.canvas.width/2)/2)/2), (context.canvas.height/2-((((context.canvas.width/2)/2)/2)*3)), 20, 0, 0, 9, 0, 1), new Circle((((context.canvas.width/2)/2)/2), (context.canvas.height/2-((((context.canvas.width/2)/2)/2)*5)), 20, 0, 0, 10, 0, 1), new Circle((context.canvas.width-(((context.canvas.width/2)/2)/2)), (context.canvas.height/2-(((context.canvas.width/2)/2)/2)), 20, 0, 0, 11, 0, 1), new Circle((context.canvas.width-(((context.canvas.width/2)/2)/2)), (context.canvas.height/2-((((context.canvas.width/2)/2)/2)*3)), 20, 0, 0, 12, 0, 1), new Circle((context.canvas.width-(((context.canvas.width/2)/2)/2)), (context.canvas.height/2-((((context.canvas.width/2)/2)/2)*5)), 20, 0, 0, 13, 0, 1), new Circle(((((context.canvas.width/2)/2)/2)*4), (context.canvas.height/2-((((context.canvas.width/2)/2)/2)*5)), 20, 0, 0, 14, 0, 1)];
var pointer = { x:0, y:0, down:false, getExtremePoint:function() { return [this.x, this.y]; } }
var selected_shape = undefined;


/*===============
=== Funciones ===
===============*/

//detectac toques entre las bolas
function drawShape(shape, c) { switch(shape.constructor) { case Circle: drawCircle(shape, c); break;}}

//dibujar la bolas
function drawCircle(circle, c = "#231f1e") {
	context.beginPath();
	context.fillStyle = "#000";
	context.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
	context.fill();
	context.closePath();
	context.beginPath();
	context.lineWidth=((context.canvas.height*1)/200);
	context.strokeStyle="#9e9e9e";
	context.arc(circle.x, circle.y, (circle.r/2), 0, Math.PI * 2);
	context.stroke();
	context.closePath();
}

function resolveCircle(c1, c2, lol) {

	let distance_x = c1.x - c2.x;
	let distance_y = c1.y - c2.y;
	let radii_sum  = c1.r + c2.r;
	let length = Math.sqrt(distance_x * distance_x + distance_y * distance_y) || 1;
	let unit_x = distance_x / length;
	let unit_y = distance_y / length;
	c1.x = c2.x + (radii_sum + 1) * unit_x;
	c1.y = c2.y + (radii_sum + 1) * unit_y;
	if (lol==0) {
		c2.a=Math.atan2((c1.y-c2.y),(c1.x-c2.x));
		c1.a=Math.atan2((c2.y-c1.y),(c2.x-c1.x));

		if ((c1.dv*(((7*20)/currentFps)/100)+1 )<100) {
			c1.dv*=(((7*20)/currentFps)/100)+1;
			if ((((c1.dv*((((7*20)/currentFps)/100)+1))*((((7*20)/currentFps)/100)+1))*((((7*20)/currentFps)/100)+1) )<100) {
				c2.dv=(((c1.dv*((((7*20)/currentFps)/100)+1))*((((7*20)/currentFps)/100)+1))*((((7*20)/currentFps)/100)+1) );
				c2.m=2;
			}
		} 
	}

}

function choque(bola){
	bola.dv*=(((7*20)/currentFps)/100)+1;
	shapes.forEach(
		function(elemento_obj) {
			if(elemento_obj.dv > 100) { elemento_obj.m=0; elemento_obj.dv=1;}	
			if ((elemento_obj.dv < 100)&&(elemento_obj.k!=bola.k)&&(bola.collide(elemento_obj, [1, 0]))) {
				elemento_obj.m=0;
				elemento_obj.dv=1
				elemento_obj.b2=0;
				resolveCircle(bola, elemento_obj,0);
 			}
 		}
 	);
}

//funcion principal dibujar 
function loop(time_stamp) {
	window.requestAnimationFrame(loop);

	var actualFrame = new Date().getTime();
	if (actualFrame- lasFrame >= 1000) {
		currentFps = frameCount;
		frameCount = 0;
		lasFrame = actualFrame;
	} frameCount++;

	var nowl=Date.now();
	var deltaTime=(nowl-lastUpdate)/(1000/context.canvas.height);
	//if(deltaTime>1)deltaTime=0;
	lastUpdate=nowl;
	context.canvas.width = context.canvas.width; 

	/*context.beginPath();
	context.textAlign="center";
	context.font=((context.canvas.height*5)/100)+"px Verdana";
	//context.rotate(-Math.PI/4);
	context.fillStyle = "blue";
	context.fillText(p1.down,(context.canvas.width/2),(context.canvas.height-(context.canvas.height/24)));
	context.fillText(p2.down,(context.canvas.width/2),((((context.canvas.height*5)/100)/2)+(context.canvas.height/24)));
	context.closePath();*/

	context.beginPath();
	context.lineWidth=((context.canvas.height*1)/40);
	context.strokeStyle = "#231f1e";//"#0009ff";
	//2: ((((context.canvas.height/4)/3)/3)/3)
	//1: ((((context.canvas.height/4)/3)/3)/3)
	//3: 0
	context.rect(0, (context.canvas.height/2), (((context.canvas.width/2)-(((context.canvas.height/4)/3)/2))), 0);
	context.rect((context.canvas.width-(context.canvas.width/2)+(((context.canvas.height/4)/3)/2)), (context.canvas.height/2), (((context.canvas.width/2)-(((context.canvas.height/4)/3)/2))), 0);
	context.stroke();
	context.closePath();

	context.beginPath();
	context.lineWidth=((context.canvas.height*1)/100);
	context.strokeStyle="#231f1e";
	//context.arc((context.canvas.width/2), (context.canvas.height/2),(context.canvas.width/6), 0, Math.PI * 2);
	context.moveTo(0,((context.canvas.height)-((context.canvas.height/4)/2)));
	context.lineTo(linex,liney);
	context.stroke();
	context.moveTo(context.canvas.width,((context.canvas.height)-((context.canvas.height/4)/2)));
	context.lineTo(linex,liney);
	context.stroke();
	context.moveTo(0,((context.canvas.height/4)/2));
	context.lineTo(linex1,liney1);
	context.stroke();
	context.moveTo((context.canvas.width),((context.canvas.height/4)/2));
	context.lineTo(linex1,liney1);
	context.stroke();
	context.closePath();

	var r = context.canvas.getBoundingClientRect();

	shapes.forEach(
		function(elemento_shapes, indice_shapes, array_shapes){
			let shape = elemento_shapes;
			shape.r=((((context.canvas.width/2)/2)/2)/2.5);
			if ((selected_shape)&&(selected_shape.collide(elemento_shapes, [1, 0]))&&(selected_shape.k!=elemento_shapes.k)) {
				ret = false;
				resolveCircle(selected_shape, elemento_shapes, 7);
			} 
			if ((shape.m==2)){

				if ((Math.cos(shape.a))<0) {
					if (shape.x>(canvas.width-shape.r)) {
						shape.b1=1;
					} else if (shape.x<shape.r){
						shape.b1=0;
					}
				} else {
					if (shape.x<shape.r) {
						shape.b1=1;
					} else if (shape.x>(canvas.width-shape.r)) {
						shape.b1=0;
					}
				}


				// y
				if ((Math.sin(shape.a))<0) {
					//abajo
					if (shape.y>context.canvas.height || (((shape.y > ((context.canvas.height/2)-((context.canvas.height*1)/40)-shape.r)) && (shape.y < (context.canvas.height/2))) && (shape.x>0)&&(shape.x<(((context.canvas.width/2)-(((context.canvas.height/4)/3)/2))+shape.r ))) || (   ((shape.y > ((context.canvas.height/2)-((context.canvas.height*1)/40)-shape.r)) && (shape.y < (context.canvas.height/2))) && (shape.x> ((context.canvas.width-(context.canvas.width/2)+(((context.canvas.height/4)/3)/2))-shape.r)  )&&(shape.x<context.canvas.width  )) ) {
						shape.b2=1;
					} else if (shape.y<0){
						shape.b2=0;
					}
				} else {
					//arriba
					if (shape.y<0 || (((shape.y < ((context.canvas.height/2)+((context.canvas.height*1)/40)+shape.r)) && (shape.y > (context.canvas.height/2))) && (shape.x>0)&&(shape.x<(((context.canvas.width/2)-(((context.canvas.height/4)/3)/2))+shape.r ))) || (   ((shape.y < ((context.canvas.height/2)+((context.canvas.height*1)/40)+shape.r)) && (shape.y > (context.canvas.height/2))) && (shape.x> ((context.canvas.width-(context.canvas.width/2)+(((context.canvas.height/4)/3)/2))-shape.r)  )&&(shape.x<context.canvas.width  ))  ) {
						shape.b2=1;
					} else if (shape.y>context.canvas.height) {
						shape.b2=0;
					}
				}
				
				if(shape.b1==1){
					shape.x+=Math.cos(shape.a)*(deltaTime/shape.dv);
				} else if (shape.b1==0) {
					shape.x+=-(Math.cos(shape.a)*(deltaTime/shape.dv));
				}

				if(shape.b2==1){
					shape.y-=-(Math.sin(shape.a)*(deltaTime/shape.dv));
				} else if (shape.b2==0) {
					shape.y-=Math.sin(shape.a)*(deltaTime/shape.dv);
				}
				choque(shape, false);
			}
			

		    if (toush) {
		    	//alert("no tocar");
		    	if (toush.targetTouches[0]) {
		    		th0.x=toush.targetTouches[0].clientX - r.left;
		    		th0.y=toush.targetTouches[0].clientY - r.left;
	    			if ((th0.y > (context.canvas.height/2))) {
	    				p1.down=true;
		    			//menor
		    			p1.x=th0.x;
		    			p1.y=th0.y;
		    			if (shape.collide(th0, [1, 0])) {
		    				d1=shape;
		    			}
		    		} else{
		    			//mayor
		    			p2.down=true
		    			p2.x=th0.x;
		    			p2.y=th0.y;
		    			if (shape.collide(th0, [1, 0])) {
		    				d2=shape;
		    			}
		    		}
		    		
		    	}

		    	if (toush.targetTouches[1]) {
		    		th1.x=toush.targetTouches[1].clientX - r.left;
		    		th1.y=toush.targetTouches[1].clientY - r.left;

		    		if ((th1.y > (context.canvas.height/2))) {
		    			p1.down=true;
		    			//menor
		    			p1.x=th1.x;
		    			p1.y=th1.y;
		    			if (shape.collide(th1, [1, 0])) {
		    				d1=shape;
		    			}
		    		} else{
		    			//mayor
		    			p2.down=true;
		    			p2.x=th1.x;
		    			p2.y=th1.y;
		    			if (shape.collide(th1, [1, 0])) {
		    				d2=shape;
		    			}
		    		}
		    	}

		    }

		    /*if (pointer.down && selected_shape == undefined) {
		    	if (shape.collide(pointer, [1, 0])) {
		    		selected_shape = shape;//shapes.splice(index, 1)[0];
		    		// break;
		    	}
		    }*/

		    drawShape(shape, "#231f1e");

		}
	);//p1=0;p2=0;



	if (d2) {
		per1 = 0;
		d2.m=0;
		d2.dv=1;
		d2.b2=0;

		if(p2.down){
			d2.m=0;
			d2.x = p2.x;
			d2.y = p2.y;
		} /*else{
			ret=true
		}*/

		if ((p2.y-(((context.canvas.height/4)/2)/2.5))<((context.canvas.height/4)/2)){
			if (p2.y<(((context.canvas.height/4)/2)+(((context.canvas.height/4)/3)/3))) {
				d2.a=Math.atan2((p2.y-((context.canvas.height/4)/1)),(p2.x-(context.canvas.width/2)));
				if (!p2.down) {
					d2.m=2;
					per1=d2;
				}
			} if (p2.down){
				linex1=p2.x;
				liney1=p2.y-(((context.canvas.height/4)/3)/2.5);
			}
		} else{
			linex1=context.canvas.width/2;
			liney1=((context.canvas.height/4)/2);
		}
		//drawShape(d1, "#231f1e");
	} 

	if (per1&&(liney1<((context.canvas.height/4)/2))){
		linex1=per1.x;
		liney1=per1.y+(((context.canvas.height/4)/3)/2.5);
	} else if ((liney1>((context.canvas.height/4)/2))) {
		per1=undefined;
		linex1=context.canvas.width/2;
		liney1=((context.canvas.height/4)/2);
	}




	if (d1) {
		per = 0;
		d1.m=0;
		d1.dv=1;
		d1.b2=0;

		if(p1.down){
			d1.m=0;
			d1.x = p1.x;
			d1.y = p1.y;
		} /*else{
			ret=true
		}*/

		if ((p1.y+(((context.canvas.height/4)/3)/2.5))>((context.canvas.height)-((context.canvas.height/4)/2))) {
			if (p1.y>(context.canvas.height-((context.canvas.height/4)/2)-(((context.canvas.height/4)/3)/3))) {
				d1.a=Math.atan2((p1.y-((context.canvas.height)-((context.canvas.height/4)/1))),(p1.x-(context.canvas.width/2)));
				if (!p1.down) {
					d1.m=2;
					per=d1;
				}
			} if (p1.down){
				linex=p1.x;
				liney=p1.y+(((context.canvas.height/4)/3)/2.5);
			}
		} else{
			inex=context.canvas.width/2;
			liney=((context.canvas.height)-((context.canvas.height/4)/2))
		}
		//drawShape(d1, "#231f1e");
	} 

	if (per&&(liney>((context.canvas.height)-((context.canvas.height/4)/2)))){
		linex=per.x;
		liney=per.y+(((context.canvas.height/4)/3)/2.5);
	} else if ((liney<((context.canvas.height)-((context.canvas.height/4)/2)))) {
		per=undefined;
		linex=context.canvas.width/2;
		liney=((context.canvas.height)-((context.canvas.height/4)/2));
	} 

	if ((!p1.down && d1)||(p1.y<(context.canvas.height/2))) {
	  //shapes.push(selected_shape);
	  //p1.down=false;
	  d1 = undefined;
	}

	if ((!p2.down && d2)||(p2.y>(context.canvas.height/2))) {
	  //shapes.push(selected_shape);
	  //p2.down=false;
	  d2 = undefined;
	}

	/* if (!pointer.down && selected_shape) {
	  shapes.push(selected_shape);
	  selected_shape = undefined;
	}*/


}

function eventDownMoveUp(event,tipo) {
	event.preventDefault();
	var r = context.canvas.getBoundingClientRect();
	if (tipo==0) {
		pointer.x = event.clientX - r.left;
		pointer.y = event.clientY - r.top;
	} else{
		toush=event;
	} 
}



/*===========
== Eventos ==
===========*/

//pantalla
window.addEventListener("resize", resize);

//raton
/*
window.addEventListener("mousedown", function(e){eventDownMoveUp(e,0)});
window.addEventListener("mousemove", function(e){eventDownMoveUp(e,0)});
window.addEventListener("mouseup", function(e){eventDownMoveUp(e,0)});
*/
//toush (pantalla tactil)
window.addEventListener("touchend", function(e){eventDownMoveUp(e,1);
p1.down=false;
p2.down=false;
}, {passive:false});
window.addEventListener("touchmove", function(e){eventDownMoveUp(e,1)}, {passive:false});
window.addEventListener("touchstart", function(e){eventDownMoveUp(e,1);}, {passive:false});

/*=======================
=== Iniciar funciones ===
=======================*/

//ancho y largo (pantalla)

//main funcion principal
loop();


/*===========
=== Array ===
===========*/

//var platillos = ["ceviche", "tacos", "pasta"];

// ====== // ======= // ====== // ====== //

/*************************************
*** Iteracion arreglo con for...in ***
**************************************/

// # cuantos platillo existen en platillos
/*for (let platillo in platillos) {
	console.log(platillos); // # platillo es el indice
	// 0
	// 1 
	// 2

	console.log(platillos[platillo]);
	// "ceviche"
	// "tacos"
	// "pasta"
}*/

// ====== // ======= // ====== // ====== //

/************************************
*** Iteracion arreglo con forEach ***
*************************************/

