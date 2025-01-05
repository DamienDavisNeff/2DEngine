// hmm 🤔

class PhysicObject {
    constructor(
        position = [], 
        size = [], 
        rotation = [], 
        mass = 0, 
        velocity = [], 
        restitution = 0, // "bounciness"
        friction = 0, 
        renderData = [],
    ) {
        this.position = position;
        this.size = size;
        this.rotation = rotation;
        this.mass = mass;
        this.velocity = velocity;
        this.restitution = restitution; // "bounciness"
        this.friction = friction;
        this.renderData = renderData;
    }
}

let allPhysicObjects = [];
function AddPhysicObject(object) {
    allPhysicObjects.push(object);
}

function UpdatePhysicObject(object) {

}