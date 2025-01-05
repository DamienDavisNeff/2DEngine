# Rendering

The `animationLoop` contains all functions that should run every frame. 

```js
function AnimationLoop(timestamp) {
    // EVERYTHING!
}
```

By default it contains: 
* A frame refresh
* Debugging info
* Pausing

## Configuration

The configuration for your loop is found in a separate file: `system.js` found in the same directory as `render.js`.  

* `targetFrameRate` determines the frame rate the engine is capped at (in theory, right now it does nothing). 
    * `targetFrameRate: 30`: An integer
* `resolution` determines the resolution your canvas should scale to
     * `resolution:[width,height]`: A two-element array
* `scalingOptions` are a list of various options about screen scaling
    * `useScreenResolution` determines if the canvas should scale directly with the screen's resolution
        * This takes priority over `useConfigResolution`
        * `useScreenResolution:true`: a boolean
    * `useConfigResolution` determines if the canvas should scale to `resolution`
        * This is overridden by `useScreenResolution`
        * `useConfigResolution:[width,height]`: A two-element array
    * `resolutionScale` is multiplied by the determined resolution (for performance)
        * `resolutionScale:0.25`: A float
* `logDebugInfo` determines whether or not debug info, such as frame times. 

# This page is incomplete ⚠️