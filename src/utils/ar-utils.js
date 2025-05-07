export function checkARSupport() {
    return !!(navigator.getUserMedia || navigator.mediaDevices.getUserMedia);
}

export function getUserMedia(constraints) {
    return navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            return stream;
        })
        .catch(error => {
            console.error("Error accessing media devices.", error);
            throw error;
        });
}