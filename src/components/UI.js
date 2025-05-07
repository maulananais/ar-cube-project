class UI {
    showInstructions() {
        const instructions = document.createElement('div');
        instructions.id = 'instructions';
        instructions.innerHTML = `
            <h2>Instructions</h2>
            <p>Scan the cube with your mobile device to view it in augmented reality.</p>
        `;
        document.body.appendChild(instructions);
    }

    hideInstructions() {
        const instructions = document.getElementById('instructions');
        if (instructions) {
            document.body.removeChild(instructions);
        }
    }
}

export default UI;