export const requestCameraAccess = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        return stream;
    } catch (error) {
        console.error("Error accessing the camera: ", error);
        throw new Error("Camera access denied.");
    }
};

export const releaseCamera = (stream) => {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
};