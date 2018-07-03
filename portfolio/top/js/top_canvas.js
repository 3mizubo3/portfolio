//初期設定
var container;
var camera, scene, renderer, group, particle;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var RENDER_INTERVAL = 30;
var TICK_INTERVAL = 500;

init();
start();
animate();
//init関数--------------------------------------------------------------------------------------
// html上に描画領域を作成
function init() {
  container = document.createElement( 'div' );
  //document.body.appendChild( container );
  document.getElementById('canvas').appendChild(container);
  //container = document.getElementById('canvas');
  // カメラ作成
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
  camera.position.z = 20000;
  // シーン作成
  scene = new THREE.Scene();

  // 何だろうこれ
  var PI2 = Math.PI * 2;
  var program = function ( ctx ) {
    ctx.beginPath();
    ctx.arc( 0, 0, 0.5, 0, PI2, true );
    ctx.fill();
  };

  // グループのインスタンスを作成
  group = new THREE.Group();
  scene.add( group );

    // マテリアルを作成
  for ( var i = 0; i < 80; i++ ) {
      var material = new THREE.SpriteCanvasMaterial ({
        //color: Math.random() * 0xffffff + 0xef92ae,
        color: 0xffffff,
        opacity: 1,
        program: program
      } );
    // マテリアルでフォグを有効にする
      material.fog = true;


    // ジオメトリを作成
      particle = new THREE.Sprite( material );
      particle.position.x = Math.random() * 2000 - 1000;
      particle.position.y = Math.random() * 2000 - 1000;
      particle.position.z = Math.random() * 2000 - 1000;
      particle.scale.x = particle.scale.y = Math.random() * 120 + 100;
      group.add( particle );
  }

  // レンダラーを作成
  renderer = new THREE.CanvasRenderer();
  renderer.setClearColor( 0x000000,0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  window.addEventListener( 'resize', onWindowResize, false );
}
//---------------------------------------------------------------------------------------------------------------
// 画面のリサイズ？
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// マウスのイベント
function onDocumentMouseMove( event ) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

// マウスのイベントー発生のタイミング
function onDocumentTouchStart( event ) {
  if ( event.touches.length === 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

// マウスのイベントー動き
function onDocumentTouchMove( event ) {
  if ( event.touches.length === 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

//---------------------------------------------------------------------------------------------------------------
// アニメイト関数
function animate() {
  requestAnimationFrame( animate );
  render();
}

// ？？レンダーのなんか　カメラを正面に向ける
function render() {
  camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  camera.position.y += ( mouseY - camera.position.y ) * 0.05;
  camera.lookAt( scene.position );

  // ？？回転の何か、、、
  var currentSeconds = Date.now();
  group.rotation.x = Math.sin( currentSeconds * 0.0005 ) * 0.8;
  group.rotation.y = Math.sin( currentSeconds * 0.0003 ) * 0.8;
  group.rotation.z = Math.sin( currentSeconds * 0.0002 ) * 0.8;

  renderer.render( scene, camera );
}

//アニメーション関数---------------------------------------------------------
//アニメ０ションの時間に関する記述
function start() {
  //現在時刻の取得、一つ前の時刻の取得
  var startTime = Date.now();
  var previousTime = startTime;
  var previousRenderTime = previousTime;
  var previousTickTime = previousTime;
  var loopId;
//ループの関数の指定・・ループ？？？
  (function loop(timestamp){
    var nowTime = Date.now();
    var elapsedTime = nowTime - startTime;
    var deltaTime = nowTime - previousTime;
    var deltaRenderTime = nowTime - previousRenderTime;
    var deltaTickTime = nowTime - previousTickTime;

    if (deltaRenderTime > RENDER_INTERVAL) {
      previousRenderTime = nowTime;
      renderer.render( scene, camera );
    }
    if (deltaTickTime > TICK_INTERVAL) {
      previousTickTime = nowTime;
      tick();
    }

    previousTime = nowTime;
    loopId = requestAnimationFrame(loop);
  })();
}

function stop(){
    cancelAnimationFrame(loopId);
}

function tick(){
    //controls.update();
}
//レンダラー
//function render(){
    //renderer.render( scene, camera );
//}

// カメラ位置のアニメーション関数----------------------
var zeroVector = new THREE.Vector3(0, 0, 0);

animateCameraPosition(this.x,this.y,400);//終点位置

function animateCameraPosition(x, y, z){
    var currentVector = camera.position;//初期位置
    var destinationVector = new THREE.Vector3(x, y, z);

    var loopId;
    var duration = 1000;//再生時間：ミリ
    var coords = currentVector;
    //tweennのモーションがかかる部分
    var tween = new TWEEN.Tween(coords)
        .to(destinationVector, duration)//終点位置、再生時間
        .onUpdate(update)//最初に読み込み、一回だけ
        .easing( TWEEN.Easing.Quintic.Out )//イージング
        .onComplete(complete)//移動した後に読み込み
        .start();
    animate();
//tweenの呼び出し
    function animate(time) {
        loopId = requestAnimationFrame(animate);
        TWEEN.update(time);
    }
    function complete() {
        cancelAnimationFrame(loopId);
    }
    function update() {
        console.log(this.x, this.y, this.z);

        camera.position.copy(coords);
        camera.lookAt(zeroVector);
    }
}
