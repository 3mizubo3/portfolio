var angle = 0;
var rectHeight=1000;
var diff=5;
var m;

function setup() {
  var myCanvas =   createCanvas(windowWidth, windowHeight);
  myCanvas.parent('canvas-container');
	noStroke();
	rectMode(CENTER);
	//frameRate(60);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255);
	blendMode(MULTIPLY);

	push();

	translate(width/2, height/1.5);

	firstrect();
	secondrect();
  secondrect();
  secondrect();
  secondrect();
  secondrect();
  secondrect();
  secondrect();
    secondrect();
	pop();

  push();
translate(width/6, height/3);
  thirdrect();
  thirdrect();
    thirdrect();
  thirdrect();
  thirdrect();
  thirdrect();
  thirdrect();
    thirdrect();
  pop();

  push();
translate(width, height/3);
  forthrect();
  forthrect();
  forthrect();
  forthrect();
  forthrect();
  forthrect();
  forthrect();
  forthrect();
  pop();
  blendMode(NORMAL);
	angle = angle + 0.0001;

	if(rectHeight > 1000 || rectHeight < 180){
		diff*=-1;
	}

	rectHeight = rectHeight+diff;
}

//------------------------------------------------
//関数---------------------------------------------
//------------------------------------------------
function firstrect() {
  	rotate(degrees(angle));
	rect(150, 0, 180, rectHeight);
}

function secondrect() {
  //translate(width/8, height/8);
  rotate(degrees(angle));
  fill(239, 201, 76);
  //m = 100*cos(degrees(angle))*(1+0.5*cos(degrees(angle))+0.3*cos(10*cos(degrees(angle))));
  m = 50*2*cos(degrees(angle))+7*cos(degrees(angle));
  rect(1.2*m, 1.2*m, 1.2*m, 1.2*m);
}

function thirdrect() {
  //translate(width/16, height/16);
  rotate(degrees(-angle));
  fill(223, 73, 73);
  m = 50*2*sin(degrees(angle))+7*sin(degrees(angle));
  rect(m, m, m, m);
}

function forthrect() {
  //translate(width/16, height/16);
  rotate(degrees(-angle));
  fill(223, 73, 73);
  m = 50*2*sin(degrees(angle))+7*sin(degrees(angle));
  rect(2*m, 2*m, 2*m, 2*m);
}


function fifthrect() {
  //translate(width/64, height/64);
  rotate(degrees(angle));
  fill(223, 73, 73);
  rect(150, 0, 180, rectHeight);
}

function sixthrect() {
  //translate(width/6, height/6);
  rotate(degrees(angle));
  fill(51, 77, 92);
  rect(150, 0, 180, rectHeight);
}

function seventhrect() {
  //translate(width/8, height/8);
  rotate(degrees(angle));
  fill(92, 178, 157);
  rect(150, 0, 180, rectHeight);
}
function eightrect() {
  //translate(width/16, height/16);
  rotate(degrees(angle));
  fill(239, 201, 76);
  rect(150, 0, 180, rectHeight);
}

function ninethrect() {
  //translate(width/32, height/32);
  rotate(degrees(angle));
  fill(226, 122, 63);
  rect(150, 0, 180, rectHeight);
}

function thenthrect() {
  //translate(width/64, height/64);
  rotate(degrees(angle));
  fill(223, 73, 73);
  rect(150, 0, 180, rectHeight);
}
