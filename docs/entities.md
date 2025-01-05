# Entities

Entities are a class built from Constructors that contain information about their position, size, and texture data.

```js
class Entity {
    constructor(position = [], size = [], renderData = []) {
        this.position = position;
        this.size = size;
        this.renderData = renderData;
    }
}
```

## Attributes

### Position

The `position` attribute is an array consisting of two elements, representing the `Entity`'s `x` and `y` positions on the canvas. 

`x` = `position[0]` <br>
`y` = `position[1]`

### Size

The `size` attribute is similar to the `position` attribute, using two-element array, representing an `Entity`'s dimensions.

`width` = `size[0]` <br>
`height` = `size[1]`

### Render Data

The `renderData` attribute is slightly more complicated. It consists of an array of arrays representing each pixel's color data. 

```
[
    [red,green,blue,alpha],[red,green,blue,alpha]
    [red,green,blue,alpha],[red,green,blue,alpha]
]
```

## Updating an Entity

You can call `UpdateEntity()` to update any attributes of an Entity.

```js
UpdateEntity(entity, newPosition, newSize, newRenderData);
```

### Fetching Texture Data

You don't need to define the `size` or `renderData` manually, instead you can fetch this data via a texture file. 

**NOTE: You can only use these functions *outside* of the constructor, as constructors do NOT support asynchronous functions**

You can fetch all data available from a texture via the `GetTextureInfo()` function. This will return an array consisting of the size & renderData from a specific image.

```js
GetTextureInfo("/imagePath");
```

```js
{
    size:[
        width,
        height,
    ],
    data:[
        [red,green,blue,alpha],[red,green,blue,alpha],
        [red,green,blue,alpha],[red,green,blue,alpha],
    ]
}
```

This also comes with two "sub-functions" that will fetch only one of these attributes. `GetTextureSize()` and `GetTextureData()`.



```js
GetTextureSize("/imagePath");
```

```js
[width,height]
```

<br>

```js
GetTextureData("/imagePath");
```

```js
[
    [red,green,blue,alpha],[red,green,blue,alpha],
    [red,green,blue,alpha],[red,green,blue,alpha],
]
```