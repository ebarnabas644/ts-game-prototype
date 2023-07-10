import * as PIXI from 'pixi.js'
import { type Player } from './models/player'
import type { EntityDTODictionary, EntityDTO } from './entity/entityDTO'
import type { GameCamera } from './gameCamera'
import type { SimpleEntity, SimpleEntityDictionary } from './entity/simpleEntity'

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

  public Start(){
    let sprite = PIXI.Sprite.from('./plane.png')
    //this.pixiApp.stage.addChild(sprite)

    let elapsed = 0.0;
    // Tell our application's ticker to run a new callback every frame, passing
    // in the amount of time that has passed since the last tick
    this.pixiApp.ticker.add((delta) => {
    // Add the time to our total elapsed time
    elapsed += delta;
    // Update the sprite's X position based on the cosine of our elapsed time.  We divide
    // by 50 to slow the animation down a bit...
    sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
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
