// Zoom level limiter - completely blocks browser zoom
let zoomLevel = 0;
const MAX_ZOOM = 0;
const MIN_ZOOM = 0;

document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === '=' || e.key === '+')) {
        if (zoomLevel >= MAX_ZOOM) {
            e.preventDefault();
            return;
        }
        zoomLevel++;
    } else if ((e.metaKey || e.ctrlKey) && e.key === '-') {
        if (zoomLevel <= MIN_ZOOM) {
            e.preventDefault();
            return;
        }
        zoomLevel--;
    } else if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        zoomLevel = 0;
    }
});

document.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.deltaY < 0 && zoomLevel >= MAX_ZOOM) {
            e.preventDefault();
        } else if (e.deltaY > 0 && zoomLevel <= MIN_ZOOM) {
            e.preventDefault();
        } else if (e.deltaY < 0) {
            zoomLevel++;
        } else if (e.deltaY > 0) {
            zoomLevel--;
        }
    }
}, { passive: false });
