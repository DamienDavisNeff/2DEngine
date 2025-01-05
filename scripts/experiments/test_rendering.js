function RenderCircle() {

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    let circleData = CalculateCircleData([(Math.random() * 50) + 100,(Math.random() * 50) + 100],(Math.random() * 50) + 20);
    let circleDataSet = new Set(circleData.map(pos => pos.join(',')));
    
    for(let a = 0; a < data.length; a += 4) {

        position = [a/4 % canvas.width, Math.floor(a/4 / canvas.width)];  // in theory this calculates the x & y position of each pixel in the canvas
        // console.log(position);

        const circleDataMatch = circleDataSet.has(position.join(','));

        if(data[a] != 255) data[a] = 255;
        if(data[a+1] != 255) data[a+1] = 255;
        if(data[a+2] != 255) data[a+2] = 255;
        if(data[a+3] != 255) data[a+3] = 255;
        
        if(circleDataMatch) {
            if(data[a] != 255) data[a] = 255;
            if(data[a+1] != 0) data[a+1] = 0;
            if(data[a+2] != 0) data[a+2] = 0;
            if(data[a+3] != 255) data[a+3] = 255;
        }

    }
    ctx.putImageData(imageData, 0, 0);

}

function CalculateCircleData(centerPos = [0, 0], radius = 200) {

    let circleData = [];
    circleData.push(centerPos);

    let circumference = Math.floor(2 * Math.PI * radius);
    for(let a = 0; a <= circumference; a++) {

        let t = (2 * Math.PI * a) / circumference;

        let x = Math.floor(centerPos[0] + radius * Math.cos(t));
        let y = Math.floor(centerPos[1] + radius * Math.sin(t));

        circleData.push([x,y]);

    }

    return circleData;
    
}