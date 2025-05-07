export function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

export function isWebXRCompatible() {
    return navigator.xr && navigator.xr.isSessionSupported('immersive-vr');
}

export function getDeviceType() {
    if (isMobile()) {
        return 'Mobile';
    }
    return 'Desktop';
}