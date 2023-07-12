import * as PIXI from 'pixi.js'
import { type Player } from './models/player'
import type { EntityDTODictionary, EntityDTO } from './entity/entityDTO'
import type { GameCamera } from './gameCamera'
import type { SimpleEntity, SimpleEntityDictionary } from './entity/simpleEntity'
import type { GameState } from './gameState'
import * as v from '@thi.ng/vectors'
import { Vec2 } from '@thi.ng/vectors'

type RenderDictionary = {[key: number]: SimpleEntity}

export class RendererSystemComponent
{
  public pixiApp: PIXI.Application
  private gameCamera: GameCamera
  public renderDictionary: RenderDictionary
  private maintanceQueue: Set<number>
  constructor(pixi: PIXI.Application, gameCamera: GameCamera){
    this.pixiApp = pixi
    this.gameCamera = gameCamera
    this.renderDictionary = {}
    this.maintanceQueue = new Set()
    this.renderMap()
  }

  public Start(gameState: GameState){
    this.pixiApp.ticker.add((delta) => {
      
    this.update(gameState.gameState)
  });
  }

  public update(entities: SimpleEntityDictionary){
    for (let index = 0; index < entities.length; index++) {
      const entity = entities[index];
      if(!this.isAlreadyCreated(entity.id)){
        this.addEntityToViewport(entity)
      }
      this.updatePosition(entity)
      this.maintanceQueue.delete(entity.id)
    }
    this.removeDestroyedEntities()
    this.copyMaintanceQueue()
  }

  private isAlreadyCreated(id: number){
    return this.renderDictionary[id]
  }

  private updatePosition(entityDTO: SimpleEntity){
    this.renderDictionary[entityDTO.id].sprite.x = entityDTO.position.x
    this.renderDictionary[entityDTO.id].sprite.y = entityDTO.position.y
  }

  private removeDestroyedEntities(){
    this.maintanceQueue.forEach(id => {
      this.gameCamera.viewport.removeChild(this.renderDictionary[Number(id)].sprite)
      delete this.renderDictionary[Number(id)]
    });
  }

  private copyMaintanceQueue(){
    this.maintanceQueue.clear()
    for (const key in this.renderDictionary) {
      this.maintanceQueue.add(Number(key))
    }
  }

  private addEntityToViewport(entity: SimpleEntity){
    const sprite = entity.sprite
    sprite.id = entity.id
    sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
    this.gameCamera.viewport.addChild(sprite)
    this.renderDictionary[entity.id] = entity
  }

  private renderMap(){
    let map = PIXI.Sprite.from('./src/core/sprites/zefir.png')
    map.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
    this.gameCamera.viewport.addChild(map)
  }
}
