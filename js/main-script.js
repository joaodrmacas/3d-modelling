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

    render(cameras[0]);
    requestAnimationFrame(animate);
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