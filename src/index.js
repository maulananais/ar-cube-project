// This file is the main JavaScript entry point for the application. It initializes the AR scene and sets up event listeners.

import ARScene from './components/ARScene';
import UI from './components/UI';

const arScene = new ARScene();
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.showInstructions();
    arScene.initAR();

    document.getElementById('start-button').addEventListener('click', () => {
        ui.hideInstructions();
        arScene.startAR();
    });

    document.getElementById('stop-button').addEventListener('click', () => {
        arScene.stopAR();
        ui.showInstructions();
    });
});