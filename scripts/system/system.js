const canvas = document.getElementById('canvasContent');
const ctx = canvas.getContext('2d', {
    willReadFrequently: true,
});

const config = {
    targetFrameRate: 60 ,
    resolution:[
        256,
        256
    ],
    scalingOptions: {
        useScreenResolution: false,
        useConfigResolution: true,
        resolutionScale:1,
    },
    logDebugInfo: true,
}

function ScaleCanvas() {
    if(config.scalingOptions.useScreenResolution) {
        canvas.width = window.innerWidth * config.scalingOptions.resolutionScale;
        canvas.height = window.innerHeight * config.scalingOptions.resolutionScale;
        return console.log(`Canvas scaled to screen resolution with scale ${config.scalingOptions.resolutionScale}`);
    }
    if(config.scalingOptions.useConfigResolution) {
        canvas.width = config.resolution[0] * config.scalingOptions.resolutionScale;
        canvas.height = config.resolution[1] * config.scalingOptions.resolutionScale;
        return console.log(`Canvas scaled to config resolution with scale ${config.scalingOptions.resolutionScale}`);
    };
}

function RefreshFrame() {

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for(let a = 0; a < data.length; a += 4) {
        
        if(data[a] != 255) data[a] = 255;
        if(data[a+1] != 255) data[a+1] = 255;
        if(data[a+2] != 255) data[a+2] = 255;

    }

    ctx.putImageData(imageData, 0, 0);

}