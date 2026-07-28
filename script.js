import * as THREE from  "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
const mindarThree = new MindARThree({
    container:document.body,
    imageTargetSrc:"/targets.mind"
});

const{renderer,scene,camera}= mindarThree;
const anchor= mindarThree.addAnchor(0);
/* const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
camera.position.z=5;
const render = new THREE.WebGLRenderer();
render.setSize(
    window.innerWidth,
    window.innerHeight
);
document.body.appendChild(
    render.domElement
); */
const geometry= new THREE.BoxGeometry(
    0.2,
    0.2,
    0.2
);

const material=  new THREE.MeshBasicMaterial({
    color:0xff0000
});
const cube= new THREE.Mesh(
    geometry,
    material
);
anchor.group.add(cube);

/* scene.add(cube);
cube.rotation.x = 0.5;
cube.rotation.y = 0.5;
render.render(
    scene,
    camera
); */

async function startAR() {
    await mindarThree.start();
    renderer.setAnimationLoop(()=>{
        renderer.render(scene,camera);
    });
}
startAR();