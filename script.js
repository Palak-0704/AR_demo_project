import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const mindarThree = new MindARThree({
    container: document.body,
    imageTargetSrc: "/targets.mind"
});

const { renderer, scene, camera } = mindarThree;

// Target image ka anchor
const anchor = mindarThree.addAnchor(0);


// Status message
const status = document.createElement("div");

status.style.position = "fixed";
status.style.top = "20px";
status.style.left = "20px";
status.style.zIndex = "9999";
status.style.color = "white";
status.style.background = "black";
status.style.padding = "10px";

status.innerText = "Searching for image...";

document.body.appendChild(status);


// Image detect hone par
anchor.onTargetFound = () => {
    status.innerText = "IMAGE FOUND";
};


// Image detect na hone par
anchor.onTargetLost = () => {
    status.innerText = "IMAGE LOST";
};

const geometry = new THREE.PlaneGeometry(2, 2);

const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide
});

const plane = new THREE.Mesh(
    geometry,
    material
);

plane.position.set(0, 0, -2);

scene.add(plane);


// AR start
async function startAR() {

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });

}

startAR();
