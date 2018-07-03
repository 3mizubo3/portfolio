

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(255,255,255,100);
  frameRate(60);
}

function draw() {
  fill(255,255,255,0);
  noStroke();
  rect(0, 0, width, height);
  // set random points to the formula

  var c = [ceil(random(7)) * 0.1,   // a
           ceil(random(7)) * 0.1,   // b
           ceil(random(97)) + 3,       // m
           ceil(random(20)),         // n1
           ceil(random(100)),       // n2
           ceil(random(100))        // n3
          ];

  // set random fill color
  fill(color( 'hsla('+
        ceil(random(230,300)) +','+
       (ceil(random(50)) + 50) +'%,'+
       (ceil(random(50)) + 50 )+'%,'+
       (ceil(random(50))*0.01) +')'));

  // draw anywhere inside the canvas
  translate(ceil(random(width)),
            ceil(random(height)));

  // start drawing our shape
  beginShape();
  for( var theta=0; theta < 2*PI ; theta +=0.01){
    var rad = r(theta, c[0], c[1], c[2], c[3], c[4], c[5]);
    var x = rad * cos(theta) * 50;
    var y = rad * sin(theta) * 50;
    vertex(x,y);
  }
//  scale(map(appearCounter, 1, 30, 30, 30));
  endShape();
}

function r(theta, a, b,  m, n1,  n2, n3){
  return pow(pow(abs(cos(m * theta / 4.0) / a), n2)
  + pow(abs(sin(m * theta / 4.0) / b), n3), -1.0 / n1);
}
