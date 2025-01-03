let renderedFrame = false;
let previousData = [];

function ExperimentalGenerateNoise(useColor, useAlpha) {

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for(let a = 0; a < data.length; a += 4) {

        position = [a/4 % canvas.width, Math.floor(a/4 / canvas.width)];  // in theory this calculates the x & y position of each pixel in the canvas

        if(renderedFrame && position[0] > 50 && position[0] < 70 && position[1] > 50 && position[1] < 200) {
            data[a] = previousData[a];
            data[a+1] = previousData[a+1];
            data[a+2] = previousData[a+2];
            data[a+3] = previousData[a+3];
            continue;
        }
        if(renderedFrame && position[0] > 100 && position[0] < 120 && position[1] > 50 && position[1] < 200) {
            data[a] = previousData[a];
            data[a+1] = previousData[a+1];
            data[a+2] = previousData[a+2];
            data[a+3] = previousData[a+3];
            continue;
        }
        if(renderedFrame && position[0] > 50 && position[0] < 120 && position[1] > 120 && position[1] < 140) {
            data[a] = previousData[a];
            data[a+1] = previousData[a+1];
            data[a+2] = previousData[a+2];
            data[a+3] = previousData[a+3];
            continue;
        }
        if(renderedFrame && position[0] > 150 && position[0] < 170 && position[1] > 50 && position[1] < 200) {
            data[a] = previousData[a];
            data[a+1] = previousData[a+1];
            data[a+2] = previousData[a+2];
            data[a+3] = previousData[a+3];
            continue;
        }

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
    previousData = data;
    renderedFrame = true;
    ctx.putImageData(imageData, 0, 0);
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}