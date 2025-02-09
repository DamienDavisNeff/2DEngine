class Entity {
    constructor(
        position = [0,0], 
        size = [0,0], 
        renderData = [
            [0,0,0,0]
        ]
    ) {
        this.position = position;
        this.size = size;
        this.renderData = renderData;
    }
}

const ExampleEntity = new Entity(
    [2, 3], 
    [3,4], 
    [
        [0,0,0,0],[0,0,0,255],[0,0,0,0],
        [0,0,0,255],[0,0,0,255],[0,0,0,255],
        [0,0,0,0],[0,0,0,255],[0,0,0,0],
        [0,0,0,0],[0,0,0,255],[0,0,0,0],
    ]
);
// The position of this entity is [0,0], meaning it is located at the top left of the canvas.
// The size of this entity is [3,4], meaning it is 3 pixels wide and 4 pixels tall.
// The render data of this entity is a 3x4 square of pixels, with the pixel data separated into its color data (0-255) and alpha data (0-255).
// Only the width is relevant for size calculation, as the height is derived from it over time based on the width, the height is still defined for easy reference.

const ExampleEntity2 = new Entity(
    [5, 9], 
    [1, 1], 
    [
        [0,0,0,0],
    ],
); 
UpdateEntity(ExampleEntity2, ExampleEntity2.position, GetTextureSize("/images/entities/ExampleEntity2.png",0), GetTextureData("/images/entities/ExampleEntity2.png"));
// The position of this entity is [5,9], meaning it is located at the coordinates [5,9] on the canvas
// The size of this entity is [1,1], meaning it is 1 pixel wide and 1 pixel tall
// The render data of this entity is a 1x1 square of pixels, with the pixel data separated into its color data (0-255) and alpha data (0-255).
// HOWEVER both the size & render data are immediately updated using a texture file
// You CANNOT use those functions INSIDE of the Constructor
// You MUST use those functions OUTSIDE of the Constructor
// This is because async functions are not supported in constructors

async function UpdateEntity(entity, newPosition = [], newSize = [], newRenderData = []) {
    entity.position = await newPosition;
    entity.size = await newSize;
    entity.renderData = await newRenderData;
}
function RenderEntity(entity) {

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    let solidColor = entity.renderData[0] === "solid" ? true : false;
    if(solidColor) solidColorData = entity.renderData[1];

    for(let a = 0; a < data.length; a += 4) {

        position = [a/4 % canvas.width, Math.floor(a/4 / canvas.width)]; // this calculates the x & y position of each pixel in the canvas

        renderLength = entity.renderData[0] === "solid" ? entity.size[0] * entity.size[1] : entity.renderData.length;

        for(let b = 0; b < renderLength; b++) {

            renderPosition = [b % entity.size[0], Math.floor(b / entity.size[0])]; // This calculates the x & y position of each piece of rendering data relative to the size

            if(position[0] == entity.position[0]+renderPosition[0] && position[1] == entity.position[1]+renderPosition[1]) {

                if(solidColor) {
                    data[a] = solidColorData[0];
                    data[a+1] = solidColorData[1];
                    data[a+2] = solidColorData[2];
                    data[a+3] = solidColorData[3];
                    continue;
                }

                data[a] = entity.renderData[b][0];
                data[a+1] = entity.renderData[b][1];
                data[a+2] = entity.renderData[b][2];
                data[a+3] = entity.renderData[b][3];

            }
        }

    }

    ctx.putImageData(imageData, 0, 0);

}


async function GetTextureInfo(texture) {

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = texture;

        img.onload = () => {

            const read_canvas = document.createElement('canvas');
            const read_ctx = read_canvas.getContext('2d');
            read_canvas.setAttribute("style","display:none;");

            read_canvas.width = img.width;
            read_canvas.height = img.height;

            read_ctx.drawImage(img, 0, 0);

            const read_data = read_ctx.getImageData(0, 0, img.width, img.height).data;

            let textureData = [];
            for(let a = 0; a < read_data.length; a += 4) {
                textureData.push([read_data[a], read_data[a+1], read_data[a+2], read_data[a+3]]);
            }

            let textureInfo = {
                size: [img.width, img.height],
                data: textureData,
            }

            resolve(textureInfo);

        };

        img.onerror = reject;

    });

}

async function GetTextureSize(texture) {

    return new Promise((resolve, reject) => {
        GetTextureInfo(texture).then((textureInfo) => {
            resolve(textureInfo.size);
        });
    });

}
async function GetTextureData(texture) {

    return new Promise((resolve, reject) => {
        GetTextureInfo(texture).then((textureInfo) => {
            resolve(textureInfo.data);
        });
    });

}