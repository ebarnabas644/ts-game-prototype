import { NetworkSystemComponent } from "./gameNetwork";
import { RendererSystemComponent } from "./gameRenderer"
import * as PIXI from 'pixi.js'
import { emitCustomEvent } from './utilities/customEventEmitter'
import { store } from "./gameState";
import { InputSystemComponent } from "./gameInput";
import { GameCamera } from "./gameCamera"
import { convertEntityDTODictionaryToSimpleEntityDictionary } from "./entity/entityDTO";
import { GameState } from "./gameState";

export let networkSystemComponent: NetworkSystemComponent
export let rendererSystemComponent: RendererSystemComponent
export let gameState: GameState
let gameCamera: GameCamera
let inputSystemComponent: InputSystemComponent
let counter = 0

export function initGame(){
    gameState = new GameState()
    counter = 0
    inputSystemComponent = new InputSystemComponent()
    networkSystemComponent = new NetworkSystemComponent()
    networkSystemComponent.initConnection()
    emitCustomEvent('engineReady', '')
    document.addEventListener('stateReceived', (event: any) => {
      gameState.updateGameState(event.detail)
      rendererSystemComponent.update(gameState.gameState)
      if(counter == 0){
        const findControlled = gameState.gameState.find(entity => entity.tags["controlledby"] == networkSystemComponent.getConnectionId())
        console.log(findControlled)
        if(findControlled){
          gameCamera.setFollow(findControlled)
          counter++
          console.log("camera set")
        }
        
      }
    })
    store.isLoading = false
}

export function setRenderer(pixiApp: PIXI.Application){
    gameCamera = new GameCamera(pixiApp)
    rendererSystemComponent = new RendererSystemComponent(pixiApp, gameCamera)
    rendererSystemComponent.Start()
    /*
    rendererSystemComponent.pixiApp.ticker.add((delta) => {
      for (const key in store.players){
        const player = store.players[key]
        player.updateComponents(delta)
      }
    })*/
}