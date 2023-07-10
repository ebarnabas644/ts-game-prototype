import { store } from '../gameState'
import type { IScript } from './Interfaces/IScript';
import * as PIXI from 'pixi.js'


export type SimpleEntityDictionary = SimpleEntity[]
// Entity class
export class SimpleEntity {
  id: number
  name: string
  position: { x: number, y: number }
  sprite: PIXI.Sprite
  health: number
  tags: {[key: string]: any}

  constructor(id: number, name: string, position: {x: number, y: number}, spritePath: string, health: number, tags: {[key: string]: any}) {
    this.id = id
    this.name = name
    this.position = {
      x: position.x,
      y: position.y
    }
    this.health = health
    this.sprite = PIXI.Sprite.from(spritePath)
    this.sprite.x = position.x
    this.sprite.y = position.y
    this.tags = tags
  }


}