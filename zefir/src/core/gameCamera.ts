import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import type { SimpleEntity } from './entity/simpleEntity'

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

    public setFollow(entity: SimpleEntity){
        this.viewport.follow(entity.sprite, {
            speed: 4,
            acceleration: 0.1,
            
        })
    }

    private setCameraPlugins(){
        this.viewport
        .drag()
        .pinch()
        .wheel()
        .decelerate({
            minSpeed: 0.01
        })
        .clamp({
            direction: 'all',
            underflow: 'center'
        })
        .clampZoom({
            minScale: 1,
            maxScale: 3
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