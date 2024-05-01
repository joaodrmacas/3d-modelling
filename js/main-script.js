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
var movcam_controls
var curr_cam = 0;


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xADD8E6); // Light blue color

    var cube = new THREE.Mesh(
        new THREE.BoxGeometry(30, 10, 50),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    );
    cube.position.set(0, 0, 0);
    scene.add(cube);
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
    front_camera.position.set(100, 0, 0);
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
    side_camera.position.set(0, 0, 100);
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

    render(cameras[curr_cam]);

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    //animation
    requestAnimationFrame(animate);

    update();

    render(cameras[curr_cam]);

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        for (var i = 0; i < cameras.length; i++){
            cameras[i].aspect = window.innerWidth / window.innerHeight;
            cameras[i].updateProjectionMatrix();
        }
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 49: //1
            curr_cam = 0;
            break;
        case 50: //2
            curr_cam = 1;
            break;
        case 51: //3
            curr_cam = 2;
            break;
        case 52: //4
            curr_cam = 3;
            break;
        case 53: //5
            curr_cam = 4;
            break;
        case 54: //6
            curr_cam = 5;
            break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
}

init();
animate();