import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class CubeModel {
    constructor(scene) {
        this.scene = scene;
        this.cube = null;
    }

    loadModel(url) {
        const loader = new GLTFLoader();
        loader.load(url, (gltf) => {
            this.cube = gltf.scene;
            this.scene.add(this.cube);
        }, undefined, (error) => {
            console.error('An error occurred while loading the model:', error);
        });
    }

    displayModel(position) {
        if (this.cube) {
            this.cube.position.set(position.x, position.y, position.z);
            this.cube.visible = true;
        }
    }

    hideModel() {
        if (this.cube) {
            this.cube.visible = false;
        }
    }
}

export default CubeModel;