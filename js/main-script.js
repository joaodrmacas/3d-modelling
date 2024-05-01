import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var scene, renderer;
var elements = [];
var cameras = [];
var movcam_controls;



/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xADD8E6); // Light blue color

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////



function createCameras(){
    'use strict';

    //TODO mudar as coordenadas das cameras para centrarem a cena
    //Usar ArrayCamera?
    
    var front_camera = new THREE.OrthographicCamera(
        window.innerWidth / -2,   // left
        window.innerWidth / 2,    // right
        window.innerHeight / 2,   // top
        window.innerHeight / -2,  // bottom
        0.1,         // near
        1000           // far
    );
    front_camera.position.set(100, 50, 0);
    front_camera.lookAt(scene.position);
    cameras.push(front_camera);

    var top_camera = new THREE.OrthographicCamera(
        window.innerWidth / -2,   // left
        window.innerWidth / 2,    // right
        window.innerHeight / 2,   // top
        window.innerHeight / -2,  // bottom
        0.1,         // near
        1000           // far
    );
    top_camera.position.set(0, 100, 0);
    top_camera.lookAt(scene.position);
    cameras.push(top_camera);

    var side_camera = new THREE.OrthographicCamera(
        window.innerWidth / -2,   // left
        window.innerWidth / 2,    // right
        window.innerHeight / 2,   // top
        window.innerHeight / -2,  // bottom
        0.1,         // near
        1000           // far
    );
    side_camera.position.set(100, 50, 0);
    side_camera.lookAt(scene.position);
    cameras.push(side_camera);

    var perspective_camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    perspective_camera.position.set(50, 50, 50);
    perspective_camera.lookAt(scene.position);
    cameras.push(perspective_camera);

    var orthographic_camera = new THREE.OrthographicCamera(
        window.innerWidth / -2,   // left
        window.innerWidth / 2,    // right
        window.innerHeight / 2,   // top
        window.innerHeight / -2,  // bottom
        0.1,         // near
        1000           // far
    );
    orthographic_camera.position.set(-50, -50, -50);
    orthographic_camera.lookAt(scene.position);
    cameras.push(orthographic_camera);

    var movable_camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    movable_camera.lookAt(0,0,0)
    movable_camera.position.set(0,0,0); //TODO meter a posicao inicial da garra
    cameras.push(movable_camera);
    movcam_controls = new OrbitControls(movable_camera, renderer.domElement);
}

function updateMovingCamera(camera,controls,claw){
    'use strict';
    var x = claw.position.x;
    var y = claw.position.y;
    var z = claw.position.z;

    camera.position.set(x, y, z);
    camera.lookAt(x,0,z);
    controls.update();
}


/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

    //TODO uncomment quando a garra for criada
    //updateMovingCamera(cameras[5],);

}

/////////////
/* DISPLAY */
/////////////
function render(camera) {
    'use strict';

    //TODO depende da camera selecionada
    renderer.render(scene, camera);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCameras();

    
    render(cameras[0]);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    //animation
    requestAnimationFrame(animate);

    update();

    render(cameras[0]);

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
}

init();
animate();