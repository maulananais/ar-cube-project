// AR Utility functions
class ARUtils {
    constructor() {
        this.isARSupported = this.checkARSupport();
    }

    checkARSupport() {
        return !!(
            navigator.mediaDevices && 
            navigator.mediaDevices.getUserMedia &&
            window.WebGLRenderingContext
        );
    }

    async setupCamera(videoElement) {
        if (!this.isARSupported) {
            console.error('AR is not supported on this device');
            return false;
        }

        try {
            // Konfigurasi kamera dengan pengaturan untuk mencegah zoom
            const constraints = {
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 960 },
                    zoom: 1.0
                },
                audio: false
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Konfigurasi tambahan untuk memastikan tidak ada zoom
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                this.configureVideoTrack(videoTrack);
            }
            
            if (videoElement) {
                videoElement.srcObject = stream;
                return new Promise((resolve) => {
                    videoElement.onloadedmetadata = () => {
                        resolve(true);
                    };
                });
            }
            
            return true;
        } catch (error) {
            console.error('Camera access error:', error);
            return false;
        }
    }

    // Fungsi untuk mengonfigurasi track video secara spesifik
    configureVideoTrack(videoTrack) {
        try {
            // Dapatkan capabilities kamera
            const capabilities = videoTrack.getCapabilities();
            
            if (!capabilities) {
                console.log('Camera capabilities not available');
                return;
            }
            
            const settings = {};
            
            // Atur zoom ke 1x (tanpa zoom)
            if (capabilities.zoom) {
                settings.zoom = 1.0;
            }
            
            // Atur mode fokus
            if (capabilities.focusMode) {
                // Coba gunakan mode AUTO terlebih dahulu, lalu CONTINUOUS
                if (capabilities.focusMode.includes('continuous')) {
                    settings.focusMode = 'continuous';
                } else if (capabilities.focusMode.includes('auto')) {
                    settings.focusMode = 'auto';
                }
            }
            
            // Nonaktifkan mode macro jika ada settingnya
            if (capabilities.focusDistance) {
                // Setel jarak fokus ke normal (bukan macro)
                // Nilai tipikal: 1.0 untuk jarak normal
                settings.focusDistance = 1.0;
            }
            
            // Terapkan semua pengaturan
            if (Object.keys(settings).length > 0) {
                videoTrack.applyConstraints({ advanced: [settings] })
                    .then(() => console.log('Applied camera settings:', settings))
                    .catch(e => console.log('Failed to apply camera settings:', e));
            }
            
            // Tambahan: Monitor perubahan pengaturan kamera
            videoTrack.addEventListener('mute', () => {
                console.log('Camera track muted');
            });
            
            videoTrack.addEventListener('unmute', () => {
                console.log('Camera track unmuted');
                // Reapply constraints when unmuted
                this.configureVideoTrack(videoTrack);
            });
            
        } catch (e) {
            console.log('Error configuring video track:', e);
        }
    }

    createARScene(canvasElement) {
        // Implementation for creating the AR scene
    }

    detectMarker(imageData) {
        // Implementation for marker detection
    }
}

export default ARUtils;