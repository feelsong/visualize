var container, stats;
			var camera, scene, renderer, particle;
			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
				camera.position.z = 1000;

				scene = new THREE.Scene();

				var material = new THREE.SpriteMaterial( {
					map: new THREE.Texture( generateSprite() ),
					blending: THREE.AdditiveBlending
				} );

				for ( var i = 0; i < 1000; i++ ) {

					particle = new THREE.Sprite( material );

					initParticle( particle, i * 10 );

					scene.add( particle );
				}

				renderer = new THREE.CanvasRenderer();
				renderer.setClearColor( 0x000000 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				container.appendChild( stats.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function generateSprite() {

				var canvas = document.createElement( 'canvas' );
				canvas.width = 32;
				canvas.height = 32;

				var context = canvas.getContext( '2d' );
				var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
				gradient.addColorStop( 0, 'rgba(0,000,000,1)' );
				gradient.addColorStop( 0.4, 'rgba(0,255,255,1)' );
				gradient.addColorStop( 0.6, 'rgba(0,0,64,1)' );
				gradient.addColorStop( 0.8, 'rgba(0,0,64,1)' );

				gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

				context.fillStyle = gradient;
				// context.fillStyle = 'rgb(155, 187, 89)';
				context.beginPath();
				// context.fillRect( 0, 0, 80, 40);
  				context.arc(32, 32, 64, 0, Math.PI*2, false);
  				context.fill();

				return canvas;

			}

			function initParticle( particle, delay ) {

				var particle = this instanceof THREE.Sprite ? this : particle;
				var delay = delay !== undefined ? delay : 0;

				particle.position.set( 0, 0, 0 )
				particle.scale.x = particle.scale.y = Math.random() * 32 + 16;

				new TWEEN.Tween( particle )
					.delay( delay )
					.to( {}, 10000 )
					.onComplete( initParticle )
					.start();

				new TWEEN.Tween( particle.position )
					.delay( delay )
					.to( { x: Math.random() * 4000 - 2000, y: Math.random() * 1000 - 500, z: Math.random() * 4000 - 2000 }, 10000 )
					.start();

				new TWEEN.Tween( particle.scale )
					.delay( delay )
					.to( { x: 100, y: 100 }, 10000 )
					.start();

			}

			//

			function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length == 1 ) {

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

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				TWEEN.update();

				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}
