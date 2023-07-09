import * as PIXI from 'pixi.js'
import { type Player } from './models/player'
import { Entity } from './entity/entity'
import type { GameCamera } from './gameCamera'

type RenderDictionary = {[key: number]: PIXI.Sprite}

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

  public update(entities: EntityDTODictionary){
    for (const key in entities) {
      for (const entityKey in entities[key]) {
        if(!this.isAlreadyCreated(entities[key][entityKey].id)){
          const entityToAdd = entities[key][entityKey]
          this.addEntityToViewport(entityToAdd)
        }
        this.updatePosition(entities[key][entityKey])
        this.maintanceQueue.delete(entities[key][entityKey].id)
      }
    }
    this.removeDestroyedEntities()
    this.copyMaintanceQueue()
    
  }

  private isAlreadyCreated(id: number){
    return this.renderDictionary[id]
  }

  private updatePosition(entityDTO: EntityDTO){
    this.renderDictionary[entityDTO.id].x = entityDTO.position.x
    this.renderDictionary[entityDTO.id].y = entityDTO.position.y
  }

  private removeDestroyedEntities(){
    this.maintanceQueue.forEach(id => {
      this.gameCamera.viewport.removeChild(this.renderDictionary[Number(id)])
      delete this.renderDictionary[Number(id)]
    });
  }

  private copyMaintanceQueue(){
    this.maintanceQueue.clear()
    for (const key in this.renderDictionary) {
      this.maintanceQueue.add(Number(key))
    }
  }

  private addEntityToViewport(entity: EntityDTO){
    const sprite = PIXI.Sprite.from('./src/core/sprites/'+entity.sprite)
    sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
    this.renderDictionary[entity.id] = sprite
    this.gameCamera.viewport.addChild(this.renderDictionary[entity.id])
  }

  private renderMap(){
    let map = PIXI.Sprite.from('./src/core/sprites/zefir.png')
    map.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
    this.gameCamera.viewport.addChild(map)
  }
}
