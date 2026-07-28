
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const mindarThree = new MindARThree({
    container: document.body,
    imageTargetSrc: "/targets.mind"
});

const { renderer, scene, camera } = mindarThree;

const anchor = mindarThree.addAnchor(0);

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

anchor.onTargetFound = () => {
    status.innerText = "IMAGE FOUND";
};

anchor.onTargetLost = () => {
    status.innerText = "IMAGE LOST";
};

const geometry = new THREE.BoxGeometry(
    0.3,
    0.3,
    0.3
);

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
});

const cube = new THREE.Mesh(
    geometry,
    material
);

cube.position.set(0, 0, 0.2);

anchor.group.add(cube);

async function startAR() {
    await mindarThree.start();

    renderer.setAnimationLoop(() => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    });
}

startAR();
