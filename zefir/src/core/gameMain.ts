import { NetworkSystemComponent } from "./gameNetwork";
import { RendererSystemComponent } from "./gameRenderer"
import * as PIXI from 'pixi.js'

export let networkSystemComponent: NetworkSystemComponent
let rendererSystemComponent: RendererSystemComponent

export function initGame(pixiApp: PIXI.Application){
    networkSystemComponent = new NetworkSystemComponent()
    rendererSystemComponent = new RendererSystemComponent(pixiApp)
    networkSystemComponent.initConnection()
    rendererSystemComponent.Start()
}