class ARScene {
    constructor() {
        this.arSession = null;
        this.markerPattern = 'assets/markers/pattern-marker.patt';
        this.cubeModel = null;
    }

    async initAR() {
        if (!this.checkARSupport()) {
            alert('AR is not supported on this device.');
            return;
        }

        this.arSession = await this.startAR();
        this.loadCubeModel();
        this.configureCamera(); // Memanggil fungsi konfigurasi kamera
    }

    checkARSupport() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    // Fungsi baru untuk mengkonfigurasi kamera tanpa zoom
    configureCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const constraints = {
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 960 },
                    zoom: 1.0,  // Memastikan zoom disetel ke 1x
                    focusMode: 'continuous', // Mode fokus otomatis kontinyu
                    advanced: [
                        { focusDistance: 1.0 }, // Fokus ke objek jarak normal
                        { exposureMode: 'continuous' }
                    ]
                }
            };
            
            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    // Dapatkan track video
                    const videoTrack = stream.getVideoTracks()[0];
                    
                    // Coba setel pengaturan tambahan jika didukung
                    try {
                        const capabilities = videoTrack.getCapabilities();
                        
                        // Cek jika perangkat mendukung pengaturan zoom
                        if (capabilities && capabilities.zoom) {
                            videoTrack.applyConstraints({
                                advanced: [{ zoom: 1.0 }]
                            });
                        }
                        
                        console.log('Camera configured successfully');
                    } catch (e) {
                        console.log('Could not apply advanced camera settings:', e);
                    }
                })
                .catch(error => {
                    console.error('Error accessing camera:', error);
                });
        }
    }

    async startAR() {
        // Implementation for starting AR session
        // This would typically involve accessing the camera and initializing AR context
    }

    loadCubeModel() {
        // Implementation for loading the cube model
        // This would involve using the CubeModel class to load and display the model
    }

    stopAR() {
        // Implementation for stopping the AR session
        // This would involve releasing camera access and cleaning up resources
    }
}

export default ARScene;