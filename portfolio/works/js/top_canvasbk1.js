/*-------------------------------------------------------
   ここから変数の宣言と定義
 -------------------------------------------------------*/
var mouseX = 0,
   mouseY = 0,
   windowHalfX = window.innerWidth / 2,
   windowHalfY = window.innerHeight / 2,
   SEPARATION = 200,
   AMOUNTX = 10,
   AMOUNTY = 10,
   camera,
   scene,
   renderer;

init();
animate();

function init() {

 var container,
     separation = 100,
     amountX = 50,
     amountY = 50,
     particle;
// 描画領域をHTMLに確保するためのコンテナ用変数
// div要素をつくってHTMLのbody要素内に追加し、その中にコンテナがもつDOM要素を追加
 container = document.createElement( 'div' );
 document.body.appendChild( container );
/*-------------------------------------------------------
   ここからシーンの生成
 -------------------------------------------------------*/
 scene = new THREE.Scene();

   /*-------------------------------------------------------
   ここからレンダラ（描画領域）の生成と設定
 -------------------------------------------------------*/
  // レンダラの生成
 renderer = new THREE.CanvasRenderer({ alpha: true }); // gradient; this can be swapped for WebGLRenderer
 //renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } )
 // WebGLをサポートしていない場合（何も表示されない場合）は上の行をコメントアウトして下の行のコメントアウトを外してください
 //renderer = new THREE.CanvasRenderer({ alpha: true } );
  // レンダラの大きさをウィンドウの幅と高さに設定
 renderer.setSize( window.innerWidth, window.innerHeight );
 // div要素をつくってHTMLのbody要素内に追加し、その中にコンテナがもつDOM要素を追加
 container.appendChild( renderer.domElement );

/*-------------------------------------------------------
   ここからカメラの生成と設定
 -------------------------------------------------------*/
// 画角20度、画面アスペクト比はウィンドウのアスペクト比と同様、手前1、後方10000までを描画できる
// 投資投影カメラ（遠近法的に映る）を生成
 camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   1,
   10000
 );
 // カメラのzの位置をを100に設定
 camera.position.z = 100;

 // particles
  /*-------------------------------------------------------
   ここからマテリアルの生成
 -------------------------------------------------------*/
  //質感。。点の描写かな？
 var PI2 = Math.PI * 2;//
 var material = new THREE.SpriteCanvasMaterial({
   color: 0xffffff,
   program: function ( context ) {
     context.beginPath();
     context.arc( 0, 0, 0.5, 0, PI2, true );
     context.fill();
   }
 });
 /*-------------------------------------------------------
   ここからジオメトリの生成
 -------------------------------------------------------*/
 var geometry = new THREE.Geometry();

 for ( var i = 0; i < 100; i ++ ) {
   particle = new THREE.Sprite( material );
   particle.position.x = Math.random() * 2 - 1;
   particle.position.y = Math.random() * 2 - 1;
   particle.position.z = Math.random() * 2 - 1;
   particle.position.normalize();
   particle.position.multiplyScalar( Math.random() * 10 + 450 );
   particle.scale.x = particle.scale.y = 10;
   scene.add( particle );
   geometry.vertices.push( particle.position );
 }

 // lines線の描写
 var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.5 } ) );
 scene.add( line );

 // mouseマウス連動
 document.addEventListener( 'mousemove', onDocumentMouseMove, false );
 document.addEventListener( 'touchstart', onDocumentTouchStart, false );
 document.addEventListener( 'touchmove', onDocumentTouchMove, false );

 window.addEventListener( 'resize', onWindowResize, false );

} // end init();

function onWindowResize() {

 windowHalfX = window.innerWidth / 2;
 windowHalfY = window.innerHeight / 2;

 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();

 renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove(event) {

 mouseX = event.clientX - windowHalfX;
 mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

 if ( event.touches.length > 1 ) {

   event.preventDefault();

   mouseX = event.touches[ 0 ].pageX - windowHalfX;
   mouseY = event.touches[ 0 ].pageY - windowHalfY;

 }
}

function onDocumentTouchMove( event ) {

 if ( event.touches.length == 1 ) {

   event.preventDefault();

   mouseX = event.touches[ 0 ].pageX - windowHalfX;
   mouseY = event.touches[ 0 ].pageY - windowHalfY;

 }
}

function animate() {

 requestAnimationFrame( animate );
 render();

}

function render() {

 camera.position.x += ( mouseX - camera.position.x ) * .05;
 camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
// カメラの向きを座標の原点上記ポジションに設定
 camera.lookAt( scene.position );

 renderer.render( scene, camera );

}
