class CameraAccess {
    constructor() {
        this.stream = null;
        this.videoElement = null;
    }

    async requestCameraAccess(videoElement) {
        this.videoElement = videoElement;
        
        try {
            // Konfigurasi kamera dengan pengaturan untuk mencegah zoom
            const constraints = {
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 960 },
                    zoom: 1.0,  // Force zoom to 1x (no zoom)
                    focusMode: 'continuous',
                    advanced: [
                        { focusDistance: 1.0 },
                        { exposureMode: 'continuous' }
                    ]
                },
                audio: false
            };
            
            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Setelah mendapatkan stream, terapkan pengaturan tambahan
            if (this.stream) {
                const videoTrack = this.stream.getVideoTracks()[0];
                
                if (videoTrack) {
                    try {
                        const capabilities = videoTrack.getCapabilities();
                        
                        // Setel zoom ke 1x jika didukung
                        if (capabilities && capabilities.zoom) {
                            await videoTrack.applyConstraints({
                                advanced: [{ zoom: 1.0 }]
                            });
                        }
                        
                        // Matikan fitur macro jika didukung
                        if (capabilities && capabilities.focusMode && 
                            capabilities.focusMode.includes('manual')) {
                            await videoTrack.applyConstraints({
                                focusMode: 'manual',
                                focusDistance: 1.0  // Jarak fokus normal
                            });
                            
                            // Kembalikan ke mode continuous setelah mengatur jarak fokus
                            await videoTrack.applyConstraints({
                                focusMode: 'continuous'
                            });
                        }
                        
                        console.log('Camera settings applied successfully');
                    } catch (e) {
                        console.log('Could not apply camera constraints:', e);
                    }
                }
                
                if (this.videoElement) {
                    this.videoElement.srcObject = this.stream;
                }
            }
            
            return true;
        } catch (error) {
            console.error('Error accessing camera:', error);
            return false;
        }
    }

    stopCameraAccess() {
        if (this.stream) {
            const tracks = this.stream.getTracks();
            tracks.forEach(track => track.stop());
            this.stream = null;
            
            if (this.videoElement) {
                this.videoElement.srcObject = null;
            }
        }
    }
}

export default CameraAccess;