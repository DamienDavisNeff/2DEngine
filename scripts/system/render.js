const canvas = document.getElementById('canvasContent');
const ctx = canvas.getContext('2d');

const config = {
    targetFrameRate: 30,
    resolution:{
        width: 256,
        height: 256,
    },
    scalingOptions: {
        useScreenResolution: true,
        useConfigResolution: false,
        resolutionScale:0.25,
    },
}

window.onload = StartupBehavior();
function StartupBehavior() {
    ScaleCanvas();
}

const frameTime = 1000 / config.targetFrameRate;
let priorEndTime = new Date().getTime();
setInterval(() => {
    const startTime = new Date().getTime();
    // DO THINGS AFTER THIS
    GenerateNoise(false,true);
    // DO THINGS BEFORE THIS
    const endTime = new Date().getTime();
    const frameInfo = {
        times:{
            startTime: startTime,
            endTime: endTime,
            priorEndTime: priorEndTime,
        },
        targets:{
            intendedFrameRenderTime: frameTime,
            intendedFrameRate: 1000/frameTime,
        },
        info:{
            totalFrameTime: `${endTime-priorEndTime} ms`,
            frameRenderTime: `${endTime-startTime} ms`,
            frameRate: `${Math.round(1000/(endTime-priorEndTime))} fps`,
            targetFrameTimeMet: endTime-priorEndTime <= frameTime*1.1,
            targetFrameRateMet: 1000/(endTime-startTime) >= config.targetFrameRate*0.9,
        }
    };
    console.log(frameInfo);
    if(!frameInfo.info.targetFrameRateMet) console.warn(`Target frame rate not met! ${frameInfo.info.frameRate}`);
    if(!frameInfo.info.targetFrameTimeMet) console.warn(`Target frame time not met! ${frameInfo.info.totalFrameTime}`);

    priorEndTime = endTime;
}, frameTime);

function ScaleCanvas() {
    if(config.scalingOptions.useScreenResolution) {
        canvas.width = window.innerWidth * config.scalingOptions.resolutionScale;
        canvas.height = window.innerHeight * config.scalingOptions.resolutionScale;
        return console.log(`Canvas scaled to screen resolution with scale ${config.scalingOptions.resolutionScale}`);
    }
    if(config.scalingOptions.useConfigResolution) {
        canvas.width = config.resolution.width * config.scalingOptions.resolutionScale;
        canvas.height = config.resolution.height * config.scalingOptions.resolutionScale;
        return console.log(`Canvas scaled to config resolution with scale ${config.scalingOptions.resolutionScale}`);
    };
}