

RenderFrame();

function RenderFrame() {

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    let circleData = CalculateCircleData([(Math.random() * 50) + 100,(Math.random() * 50) + 100],(Math.random() * 50) + 20);
    let circleDataSet = new Set(circleData.map(pos => pos.join(',')));
    
    for(let a = 0; a < data.length; a += 4) {

        position = [a/4 % canvas.width, Math.floor(a/4 / canvas.width)];  // in theory this calculates the x & y position of each pixel in the canvas
        // console.log(position);

        const circleDataMatch = circleDataSet.has(position.join(','));

        data[a] = 255;
        data[a+1] = 255;
        data[a+2] = 255;
        data[a+3] = 255;

        if(circleDataMatch) {
            data[a] = 255;
            data[a+1] = 0;
            data[a+2] = 0;
            data[a+3] = 255;
        }

    }
    ctx.putImageData(imageData, 0, 0);

}

function CalculateCircleData(centerPos = [0, 0], radius = 200) {

    let circleData = [];
    circleData.push(centerPos);

    for(let a = 0; a <= radius; a++) {
        circleData.push([centerPos[0]+a,centerPos[1]]);
    }
    for(let b = 0; b <= radius; b++) {
        circleData.push([centerPos[0]-b,centerPos[1]]);
    }
    for(let c = 0; c <= radius; c++) {
        circleData.push([centerPos[0],centerPos[1]+c]);
    }
    for(let d = 0; d <= radius; d++) {
        circleData.push([centerPos[0],centerPos[1]-d]);
    }

    let circumference = Math.floor(2 * Math.PI * radius);
    for(let a = 0; a <= circumference; a++) {

        let t = (2 * Math.PI * a) / circumference;

        let x = Math.floor(centerPos[0] + radius * Math.cos(t));
        let y = Math.floor(centerPos[1] + radius * Math.sin(t));

        circleData.push([x,y]);

    }

    return circleData;
    
}