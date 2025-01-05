const frameTime = 1000 / config.targetFrameRate; // calculates frameTime from FPS

let isPaused = false; // Declared globally to properly control it via events
let priorEndTime = new Date().getTime(); // Used in render loop to calculate total frame time from start

window.onload = StartupBehavior();
function StartupBehavior() {
    ScaleCanvas();
    requestAnimationFrame(AnimationLoop);
}

function AnimationLoop(timestamp) {


    const startTime = new Date().getTime(); // Used to calculate frame debug info

    if(isPaused) return console.log("Paused!"); // Used to prevent rendering while paused
    RefreshFrame(); // Clears the canvas
    
    // MAIN RENDERING CONTENT 👇

    ExampleEntity2.position = [ExampleEntity2.position[0]+1, ExampleEntity2.position[1]];
    if(ExampleEntity2.position[0] > canvas.width) ExampleEntity2.position = [0, ExampleEntity2.position[1]];

    RenderEntity(ExampleEntity);
    RenderEntity(ExampleEntity2);
    
    // MAIN RENDERING CONTENT 👆

    // FRAME DEBUG INFO 👇

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
            targetFrameRateMet: 1000/(endTime-startTime) >= config.targetFrameRate * 0.9,
        }
    };

    if(config.logDebugInfo) {
        console.log(frameInfo);
        if(!frameInfo.info.targetFrameRateMet) console.warn(`Target frame rate not met! ${frameInfo.info.frameRate}`);
        if(!frameInfo.info.targetFrameTimeMet) console.warn(`Target frame time not met! ${frameInfo.info.totalFrameTime}`);
    }

    priorEndTime = endTime;

    // FRAME DEBUG INFO 👆

    requestAnimationFrame(AnimationLoop);

}

/*
setInterval(() => {

    const startTime = new Date().getTime(); // Used to calculate frame debug info
    if(isPaused) return console.log("Paused!"); // Used to prevent rendering while paused

    // MAIN RENDERING CONTENT 👇

    // RenderFrame();

    // MAIN RENDERING CONTENT 👆

    // FRAME DEBUG INFO

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
            targetFrameRateMet: 1000/(endTime-startTime) >= config.targetFrameRate * 0.9,
        }
    };

    console.log(frameInfo);
    if(!frameInfo.info.targetFrameRateMet) console.warn(`Target frame rate not met! ${frameInfo.info.frameRate}`);
    if(!frameInfo.info.targetFrameTimeMet) console.warn(`Target frame time not met! ${frameInfo.info.totalFrameTime}`);

    priorEndTime = endTime;

    // END FRAME DEBUG INFO

}, frameTime);
*/

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

document.addEventListener('keydown', (e) => 
    {if(e.key == 'p') isPaused = !isPaused}
);
