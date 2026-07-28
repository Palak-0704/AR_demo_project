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

const geometry = new THREE.BoxGeometry(
    1,
    1,
    1
);

const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: false
});

const cube = new THREE.Mesh(
    geometry,
    material
);

// Image ke exact center par
cube.position.set(0, 0, 0);

// Cube ko thoda rotate karenge
cube.rotation.x = 0.5;
cube.rotation.y = 0.5;

// Anchor ke andar add
anchor.group.add(cube);


// AR start
async function startAR() {

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });

}

startAR();
