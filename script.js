import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", startAr);

async function startAr() {

    const mindarThree = new MindARThree({
        container: document.querySelector("#ar-container"),
        imageTargetSrc: "./targets.mind"
    });

    const {
        renderer,
        scene,
        camera
    } = mindarThree;

    // Light
    const light = new THREE.HemisphereLight(
        0xffffff,
        0xbbbbff,
        1
    );

    scene.add(light);

    // Cube
    const geometry = new THREE.BoxGeometry(
        0.2,
        0.2,
        0.2
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });

    const cube = new THREE.Mesh(
        geometry,
        material
    );

    // Target image ke saath anchor
    const anchor = mindarThree.addAnchor(0);

    anchor.group.add(cube);

    // Start AR
    await mindarThree.start();

    // Render loop
    renderer.setAnimationLoop(() => {
        renderer.render(
            scene,
            camera
        );
    });
}
