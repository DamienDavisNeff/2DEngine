function GenerateNoise(useColor, useAlpha) {

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;
    
    for(let a = 0; a < data.length; a += 4) {
        let colors = [
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255,
        ]
        data[a] = colors[0];
        data[a+1] = useColor ? colors[1] : colors[0];
        data[a+2] = useColor ? colors[2] : colors[0];
        data[a+3] = useAlpha ? colors[3] : 255;
    }
    ctx.putImageData(imageData, 0, 0);
}

function GeneratePerlinNoise() {

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for(let a = 0; a < data.length; a+=4) {

        position = [a/4 % canvas.width, Math.floor(a/4 / canvas.width)];  // in theory this calculates the x & y position of each pixel in the canvas
        // console.log(a/4, position)


        noise = CalculatePerlinNoise([position[0] ,position[1] ]);
        data[a] = noise;
        data[a+1] = noise;
        data[a+2] = noise;
        data[a+3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
}


// Something is broken about this noise, I'm pretty sure.
function CalculatePerlinNoise(pos) { 

    // based on an article found at https://rtouti.github.io/graphics/perlin-noise-algorithm
   
// future me: remove xf and yf, use base X & Y to see if that fixes smoothijg
// such precision seems unnecessary?? maybe its important but idk
    const X = Math.floor(pos[0]) & 255;
    const Y = Math.floor(pos[1]) & 255;
    const xf = pos[0] - Math.floor(pos[0]);
    const yf = pos[1] - Math.floor(pos[1]);

    const topRight = [xf-1.0,yf-1.0];
    const topLeft = [xf,yf-1.0];
    const bottomRight = [xf-1.0,yf];
    const bottomLeft = [xf,yf];

    var permutation = [];
    for (let a = 0; a < 256; a++) {
        permutation[a] = a;
    }
    permutation = ShuffleArray(permutation);

    const valueTopRight = permutation[permutation[X+1]+Y+1];
    const valueTopLeft = permutation[permutation[X]+Y+1];
    const valueBottomRight = permutation[permutation[X+1]+Y];
    const valueBottomLeft = permutation[permutation[X]+Y];

    const dotTopRight = CalculateDot(GetConstantVector(valueTopRight),topRight);
    const dotTopLeft = CalculateDot(GetConstantVector(valueTopLeft),topLeft);
    const dotBottomRight = CalculateDot(GetConstantVector(valueBottomRight),bottomRight);
    const dotBottomLeft = CalculateDot(GetConstantVector(valueBottomLeft),bottomLeft);

    const u = Fade(xf);
    const v = Fade(yf);

    let result = Lerp(Lerp(dotTopRight, v, dotBottomRight), u, Lerp(dotTopLeft, v, dotBottomLeft));

    result = Math.min(Math.max(result,-1.0),1.0);
    result = (result + 1.0) / 2.0;
    result *= 255;
    result = Math.min(Math.max(result,0.0),255.0);

    // console.log(result);
    return result;
}

function GetConstantVector(v) {
    const h = v & 3;
    if(h === 0) return [1.0,1.0];
    if(h === 1) return [-1.0,1.0];
    if(h === 2) return [-1.0,-1.0];
    if(h === 3) return [1.0,-1.0];
}
function CalculateDot(a,b) {
    return a[0] * b[0] + a[1] * b[1];
} // Dot Product (Direction)
function Lerp(a,b,t) {
    return a + (b - a) * t;
} // Linear Interpolation
function UnoptimizedFade(t) {
    return 6*t*t*t*t*t - 15*t*t*t*t + 10*t*t*t;
} // Unoptimized Fade (Ease In/Out)
function Fade(t) {
    return ((6 * t - 15) * t + 10) * t * t * t;
} // Optimized Fade (Ease In/Out) using less multiplication

function ShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}