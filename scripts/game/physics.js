class PhysicsObject { 
    constructor(
        Entity = new Entity(
            [0,0],
            [0,0],
            [
                [0,0,0,0]
            ]
        ),
        precisePosition = [0,0], // this will be set automatically from the starting position of the entity, so you don't have to set it manually
        rotation = 0, // currently not being used, too complicated, but may be in the future
        mass = 0, 
        velocity = [0,0], 
        restitution = 0, // "bounciness"
        friction = 0, // between 0-1, how much the velocity should decrease over time
        collision = false,
        collisionType = 0, // 0 for rectangle, 1 for circle
    ) {
        this.Entity = Entity;
        this.precisePosition = precisePosition;
        this.rotation = rotation;
        this.mass = mass;
        this.velocity = velocity;
        this.restitution = restitution;
        this.friction = friction;
        this.collision = collision;
        this.collisionType = collisionType;
    }
}

let allPhysicObjects = [];
function AddPhysicObject(object) { allPhysicObjects.push(object); }

function UpdatePhysicObjects() {
    for(let a = 0; a < allPhysicObjects.length; a++) {

        let currentObject = allPhysicObjects[a];

        currentObject.precisePosition = [
            currentObject.precisePosition[0] + currentObject.velocity[0],
            currentObject.precisePosition[1] + currentObject.velocity[1]
        ]; // PRECISE POSITION FROM VELOCITY

        // rotation
        // restitution

        currentObject.velocity = [
            currentObject.velocity[0] - (currentObject.friction * currentObject.velocity[0]), 
            currentObject.velocity[1] - (currentObject.friction * currentObject.velocity[1])
        ]; // UPDATE VELOCITY FROM FRICTION
        
        currentObject.Entity.position = [
            Math.round(currentObject.precisePosition[0]),
            Math.round(currentObject.precisePosition[1])
        ]; // NON-PRECISE PRECISION FOR RENDERING, CALCULATED FROM PRECISE POSITION
    }
}

function EnforceTerminalVelocity(object) {

    // calculate total velocity
    let totalVelocity = Math.abs(object.velocity[0]) + Math.abs(object.velocity[1]);
    if(totalVelocity == 0) return; // skips unnessary calc if the velocity is 0
    // calculate terminal velocity
    let terminalVelocity = object.mass * physicsConfig.terminalVelocityScale;
    if(totalVelocity < terminalVelocity) return; // skips unessasary calc if velocity is smaller than terminal
    // calculate proportion of velocity
    let xVelocityProportion = Math.abs(object.velocity[0]) / totalVelocity;
    let yVelocityProportion = Math.abs(object.velocity[1]) / totalVelocity;
    // distribute terminal velocity based on x & y proportion
    let xTerminalVelocity = terminalVelocity * xVelocityProportion;
    let yTerminalVelocity = terminalVelocity * yVelocityProportion;

    object.velocity = [
        Math.sign(object.velocity[0]) * xTerminalVelocity,
        Math.sign(object.velocity[1]) * yTerminalVelocity,
    ]

}

function ApplyForce(object, force = [0,0]) {
    object.velocity = [
        object.velocity[0] + force[0],
        object.velocity[1] + force[1]
    ];
}