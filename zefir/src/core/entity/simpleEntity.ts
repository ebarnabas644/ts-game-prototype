import { store } from '../gameState'
import * as PIXI from 'pixi.js'


export type SimpleEntityDictionary = SimpleEntity[]
// Entity class
export class SimpleEntity {
  id: number
  name: string
  position: { x: number, y: number }
  sprite: PIXI.AnimatedSprite
  state: string
  health: number
  tags: {[key: string]: any}

  constructor(id: number, name: string, position: {x: number, y: number}, spritePath: string, health: number, tags: {[key: string]: any}, state: string) {
    this.id = id
    this.name = name
    this.position = {
      x: position.x,
      y: position.y
    }
    this.health = health
    this.state = state
    this.runSprite = new PIXI.AnimatedSprite(sprite.animations.run)
    this.idleDownSprite = new PIXI.AnimatedSprite(sprite.animations.idleDown)
    this.sprite = new PIXI.AnimatedSprite(this.idleDownSprite.textures)
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.sprite.animationSpeed = 0.166
    this.sprite.play()
    this.sprite.x = position.x
    this.sprite.y = position.y
    const container = new PIXI.Container()
    container.meta = {
      id: this.id
    }
    this.sprite.addChild(container)
    this.tags = tags
  }

  release(){
    this.sprite.destroy()
  }

  setState(newState: string){
    if(this.state != newState){
      this.state = newState
      this.sprite.stop()
      this.idleDownSprite.stop()
      this.runSprite.stop()
      if(this.state == 'idle'){
        this.sprite.textures = this.idleDownSprite.textures
      }
      else if(this.state == 'run'){
        this.sprite.textures = this.runSprite.textures
      }
      this.sprite.play()
    }
  }

}
}