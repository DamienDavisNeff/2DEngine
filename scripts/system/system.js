const canvas = document.getElementById('canvasContent');
const ctx = canvas.getContext('2d', {
    willReadFrequently: true,
});

const config = {
    targetFrameRate: 30,
    resolution:{
        width: 256,
        height: 256,
    },
    scalingOptions: {
        useScreenResolution: false,
        useConfigResolution: true,
        resolutionScale:1,
    },
    logDebugInfo: false,
}