// hmm 🤔

const physicsConfig = {
    gravityScale: 0,
    terminalVelocityScale: 10, // multiplied by mass to get terminal velocity
    enforceTerminalVelocity: true
}

class PhysicObject {
    constructor(
        position = [0,0], 
        size = 0, 
        renderData = [
            [0,0,0,0]
        ],
        precisePosition = [0,0], // while you can set this manually, it's ignored and automatically replaced with the default position when instantiated // this is used for physics
        rotation = 0, // currently not being used, too complicated, but may be in the future
        mass = 0, 
        velocity = [0,0], 
        restitution = 0, // "bounciness"
        friction = 0, 
        collision = false,
        collisionType = 0, // 0 for rectangle, 1 for circle
    ) {
        this.position = position;
        this.size = size;
        this.renderData = renderData;
        this.precisePosition = position;
        this.rotation = rotation;
        this.mass = mass;
        this.velocity = velocity;
        this.restitution = restitution;
        this.friction = friction;
        this.collision = collision;
        this.collisionType = collisionType;
    }
} // This specifically uses the same order as the Entity class instead of the one that makes the most sense, to reuse the same rendering code later

let allPhysicObjects = [];

const ExamplePhysicObject = new PhysicObject(
    [10,10],
    [5,10],
    [
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
    ],
    [10,10],
    0,
    1,
    [0,0],
    0,
    0.05,
    true,
    0
);
const ExamplePhysicObject2 = new PhysicObject(
    [13,12],
    [5,10],
    [
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],[0,0,0,255],
    ],
    [10,10],
    0,
    1,
    [0,0],
    0,
    0.05,
    true,
    0
);

function AddPhysicObject(object) {
    allPhysicObjects.push(object);
}

function UpdatePhysicObject(object) {

    object.velocity = [object.velocity[0], (object.velocity[1] + object.mass * physicsConfig.gravityScale)]; // GRAVITY
    
    EnforceTerminalVelocity(object);

    object.velocity = [object.velocity[0] - (object.friction * object.velocity[0]), object.velocity[1] - (object.friction * object.velocity[1])]; // FRICTION

    object.precisePosition = [object.precisePosition[0] + object.velocity[0], object.precisePosition[1] + object.velocity[1]]; // PRECISE POSITION FOR PHYSICS
    object.position = [Math.round(object.precisePosition[0]), Math.round(object.precisePosition[1])]; // NON-PRECISE PRECISION FOR RENDERING

    RenderEntity(object);

}

function EnforceTerminalVelocity(object) {
    if(physicsConfig.enforceTerminalVelocity) {
        
        // ENFORCE TERMINAL VELOCITY
        if(object.velocity[0] > object.mass * physicsConfig.terminalVelocityScale) object.velocity = [object.mass * physicsConfig.terminalVelocityScale, object.velocity[1]];
        if(object.velocity[1] > object.mass * physicsConfig.terminalVelocityScale) object.velocity = [object.velocity[0], object.mass * physicsConfig.terminalVelocityScale];

        if(object.velocity[0] < -object.mass * physicsConfig.terminalVelocityScale) object.velocity = [-object.mass * physicsConfig.terminalVelocityScale, object.velocity[1]];
        if(object.velocity[1] < -object.mass * physicsConfig.terminalVelocityScale) object.velocity = [object.velocity[0], -object.mass * physicsConfig.terminalVelocityScale];

    }
}

function ApplyForce(object, force) {
    object.velocity = [object.velocity[0] + force[0], object.velocity[1] + force[1]];
}

// TODO
// COLLISION
// COLLISION RESPONSE
// DELTA TIME SHIT

function CollisionDetection(obj1, obj2) {
    
}

