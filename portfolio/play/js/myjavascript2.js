//asteroid clone (core mechanics only)
//arrow keys to move + x to shoot

//変数設定▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
//ゲーム----------------------------------
var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage;
var MARGIN = 40;
//----------------------------------ゲーム//
//音楽-------------------------------------
var bugs = [];
var cWidth = 800/2;
var cHeight = 800/2;
var time = 0;
var colorShift = 0;

function preload(){
        sound = loadSound('assets/song1.wav');
      }
//-----------------------------------音楽//

//初期設定▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
function setup() {
//ゲーム----------------------------------
let canvas = createCanvas(windowWidth,windowHeight);
canvas.parent("canvas");

bulletImage = loadImage("assets/asteroids_bullet.png");
shipImage = loadImage("assets/asteroids_ship0001.png");
particleImage = loadImage("assets/asteroids_particle.png");

ship = createSprite(width/2, height/2);
ship.maxSpeed = 6;
ship.friction = .98;
ship.setCollider("circle", 0,0, 20);

ship.addImage("normal", shipImage);
ship.addAnimation("thrust", "assets/asteroids_ship0002.png", "assets/asteroids_ship0007.png");

asteroids = new Group();
bullets = new Group();

for(var i = 0; i<8; i++) {
  var ang = random(360);
  var px = width/2 + 1000 * cos(radians(ang));
  var py = height/2+ 1000 * sin(radians(ang));
  createAsteroid(3, px, py);
  }

//----------------------------------ゲーム//
//音楽-------------------------------------
  colorMode(HSB);
  //sound.play();
  fft = new p5.FFT();
  sound.amp(0.5);
  textSize(16);
  noStroke();

var frequencyBands = 16;
for(var i = 0; i < frequencyBands; i++)
{
  bugs.push(new Jitter());
}
var playButton = createButton('play');
    playButton.mousePressed(function() {
        sound.play();
    });
var pauseButton = createButton('pause');
    pauseButton.mousePressed(function() {
        sound.pause();
    });

}


//-----------------------------------音楽//



//描画▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
function draw() {
  //音楽-------------------------------------
  background((colorShift/8)%360,10,100,150/255);
  //background(245,150);
  noStroke();
  fill(0,0,100,1);
  text("Click to play/pause",cWidth/2,50);
  var spectrum = fft.analyze();
  var averages = fft.linAverages();
  for (var i = 0; i< averages.length; i++){
  var x = map(i, 0, averages.length, 0, cWidth);
  var h = -cHeight + map(averages[i], 0, 255, cHeight, 0);

  fill((colorShift/8)%360,abs(h/4),100,200/255)
  //if(i == 0)
  stroke(0,0,100,0.5);
  //else
    //noStroke();
  bugs[i].update(h);
  //bugs[i].move();

  //rect(x, height, width / averages.length, h )
}
time++;
colorShift++
  //-----------------------------------音楽//

  //ゲーム----------------------------------
  textAlign(CENTER);
  text("Controls: Arrow Keys + X", width/2, 20);

  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
  if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
  if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
  if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
  }

  asteroids.overlap(bullets, asteroidHit);

  ship.bounce(asteroids);

  if(keyDown(LEFT_ARROW))
    ship.rotation -= 4;
  if(keyDown(RIGHT_ARROW))
    ship.rotation += 4;
  if(keyDown(UP_ARROW))
    {
    ship.addSpeed(200, ship.rotation);
    ship.changeAnimation("thrust");
    }
  else
    ship.changeAnimation("normal");

  if(keyWentDown("x"))
    {
    var bullet = createSprite(ship.position.x, ship.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
    bullet.life = 30;
    bullets.add(bullet);
    }

  drawSprites();
//----------------------------------ゲーム//
//音楽-------------------------------------
//-----------------------------------音楽//
}

//関数▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
//ゲーム----------------------------------
function createAsteroid(type, x, y) {
  var a = createSprite(x, y);
  var img  = loadImage("assets/asteroid"+floor(random(0,4))+".png");
  a.addImage(img);
  a.setSpeed(2.5-(type/2), random(360));
  a.rotationSpeed = .5;
  //a.debug = true;
  a.type = type;

  if(type == 2)
    a.scale = .6;
  if(type == 1)
    a.scale = .3;

  a.mass = 2+a.scale;
  a.setCollider("circle", 0, 0, 50);
  asteroids.add(a);
  return a;
}

function asteroidHit(asteroid, bullet) {
var newType = asteroid.type-1;

if(newType>0) {
  createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  }

for(var i=0; i<10; i++) {
  var p = createSprite(bullet.position.x, bullet.position.y);
  p.addImage(particleImage);
  p.setSpeed(random(3,5), random(360));
  p.friction = 0.95;
  p.life = 15;
  }

bullet.remove();
asteroid.remove();
}
//----------------------------------ゲーム//
//音楽-------------------------------------
//function mouseReleased()
//{
//  togglePlay();
//}

// fade sound if mouse is over canvas
//function togglePlay() {
//  if (sound.isPlaying()) {
//    sound.pause();
//  } else {
//    sound.loop();
//  }
//}
// fade sound if mouse is over canvas
document.getElementById("on-button").onclick = function() {
  console.log("音楽スタート");
    sound.loop();
};

document.getElementById("off-button").onclick = function() {
  console.log("音楽ストップ");
    sound.pause();
};

/*document.getElementById("sound--on").onclick = function() {
  console.log("クリックされた！");
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
};*/

function Jitter() {
        //this.x = random((width/2))+(width/4);
        //this.y = random((height/2))+(height/4);
        this.x;
        this.y;
        this.w;
        this.speed = 1;

        this.move = function() {
          this.x += random(-this.speed, this.speed);
          this.y += random(-this.speed, this.speed);
        };

        this.update = function(d)
        {
          for(var i = 0; i < 360; i+=36)
          {
            this.x = cos(radians(i)) * 100 + width / 2;
            this.y = sin(radians(i)) *10 + height / 2;
            this.w = sin(radians(time+i)) * 200;
            this.w = abs(this.w);
            ellipse(this.x, this.y, this.w*(d/100), this.w*(d/100));
        	}

        }

      };
//-----------------------------------音楽//
