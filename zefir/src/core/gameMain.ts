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
export let inputSystemComponent: InputSystemComponent
export let gameState: GameState
let gameCamera: GameCamera


export function initGame(){
  networkSystemComponent = new NetworkSystemComponent()
  networkSystemComponent.initConnection()
    document.addEventListener('playerReceived', (event) => {
      gameState = new GameState()
      inputSystemComponent = new InputSystemComponent()
      rendererSystemComponent.Start(gameState)
      document.addEventListener('stateReceived', (event: any) => {
        gameState.updateGameState(event.detail)
        // TODO: Hell no pls fix this future me
        const findControlled = gameState.gameState.find(entity => entity.tags["controlledby"] == networkSystemComponent.getConnectionId())
          if(findControlled){
            gameCamera.setFollow(findControlled)
          }
      })
      store.isLoading = false
    })
}

export function setRenderer(pixiApp: PIXI.Application){
    gameCamera = new GameCamera(pixiApp)
    rendererSystemComponent = new RendererSystemComponent(pixiApp, gameCamera)
}