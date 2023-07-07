import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

export class GameCamera{
    public viewport: Viewport
    constructor(pixiApp: PIXI.Application){
        this.viewport = new Viewport({
            screenHeight: pixiApp.screen.height,
            screenWidth: pixiApp.screen.width,
            worldHeight: 5000,
            worldWidth: 5000,
        
            events: pixiApp.renderer.events
        })
        pixiApp.stage.addChild(this.viewport)

        this.setCameraPlugins()
        this.compensateForDevicePixelRatio()
        window.addEventListener("resize", this.resizeViewport)
    }

    private setCameraPlugins(){
        this.viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate()
        .clamp({
            direction: 'all',
            underflow: 'center'
        })
    }

    private compensateForDevicePixelRatio(){
        this.viewport.zoom(1/window.devicePixelRatio)
    }

    private resizeViewport(){
        console.log(this.viewport)
        this.viewport.screenHeight = window.innerHeight
        this.viewport.screenWidth = window.innerWidth
    }
}