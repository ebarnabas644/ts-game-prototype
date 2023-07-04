import { NetworkSystemComponent } from "./gameNetwork";
import { RendererSystemComponent } from "./gameRenderer"
import * as PIXI from 'pixi.js'
import { Entity } from "./entity/entity";
import { HealthComponent } from "./entity/Components/healthComponent";
import { PlayerControllerComponent } from "./entity/Components/playerControllerComponent";
import { PositionComponent } from "./entity/Components/positionComponent";
import { SpriteComponent } from "./entity/Components/spriteComponent";
import type { IScript } from "./entity/Interfaces/IScript";
import { emitCustomEvent } from './utilities/customEventEmitter'
import { store } from "./gameState";

export let networkSystemComponent: NetworkSystemComponent
let rendererSystemComponent: RendererSystemComponent

export function initGame(pixiApp: PIXI.Application){
    networkSystemComponent = new NetworkSystemComponent()
    rendererSystemComponent = new RendererSystemComponent(pixiApp)
    networkSystemComponent.initConnection()
    rendererSystemComponent.Start()
}    rendererSystemComponent.pixiApp.ticker.add((delta) => {
      for (const key in store.players){
        const player = store.players[key]
        player.updateComponents(delta)
      }
    })
}

function initTestPlayers(){
  const player2 = new Entity('player2')
  const player = new Entity('player')
  player.addComponent('position', new PositionComponent(100,50))
  player.addComponent('health', new HealthComponent(50))
  player.addComponent('playerController', new PlayerControllerComponent())
  player.addComponent('sprite', new SpriteComponent('./src/core/sprites/player.png'))
  const component = player.getComponent('sprite') as SpriteComponent
  component.init()
  const spriteComp = player.getComponent('sprite') as SpriteComponent
  player2.addComponent('position', new PositionComponent(100,50))
  player2.addComponent('health', new HealthComponent(50))
  store.isLoading = false
  //console.log(store)
}
