const frameTime = 1000 / config.targetFrameRate; // calculates frameTime from FPS

let isPaused = false; // Declared globally to properly control it via events
let priorEndTime = new Date().getTime(); // Used in render loop to calculate total frame time from start


// INIT GAME OBJECTS
const Player = new Entity(
    [5,9],
    [1,1],
    [
        [0,0,0,0],
    ]
)
UpdateEntity(Player, Player.position, GetTextureSize("/images/entities/ExampleEntity2.png",0), GetTextureData("/images/entities/ExampleEntity2.png"));

const PlayerPhysics = new PhysicsObject(
    Player,
    Player.position,
    0,
    1,
    [0,0],
    0,
    0.05,
    false,
    0,
    true,
)
AddPhysicObject(PlayerPhysics);

const GroundEntity = new Entity(
    [5,200],
    [1,1],
    [
        [0,0,0,255],
    ],
)
UpdateEntity(GroundEntity, GroundEntity.position, GetTextureSize("/images/entities/GroundEntity.png",0), GetTextureData("/images/entities/GroundEntity.png"));

function AnimationLoop(timestamp) {


    const startTime = new Date().getTime(); // Used to calculate frame debug info

    if(isPaused) {
        console.log("Paused!");
        return requestAnimationFrame(AnimationLoop);
    } // Used to prevent rendering while paused
    RefreshFrame(); // Clears the canvas
    
    // MAIN RENDERING CONTENT 👇

    RenderEntity(Player);
    // RenderEntity(GroundEntity);
    UpdatePhysicObjects();
    
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

window.onload = StartupBehavior();
function StartupBehavior() {
    ScaleCanvas();
    requestAnimationFrame(AnimationLoop);
}

document.addEventListener('keydown', (e) => 
    {if(e.key == 'p') isPaused = !isPaused}
);

