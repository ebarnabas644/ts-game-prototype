import { store } from '../gameState'
import type { IScript } from './Interfaces/IScript';
import * as PIXI from 'pixi.js'


export type SimpleEntityDictionary = SimpleEntity[]
// Entity class
export class SimpleEntity {
  id: number
  name: string
  position: { x: number, y: number }
  sprite: PIXI.AnimatedSprite
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
    this.sprite = new PIXI.AnimatedSprite(sprite.animations.idle)
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


}

const playerSpriteData = {
  frames: {
    idle1: {
      frame: { x: 0, y: 0, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    idle2: {
      frame: { x: 48, y: 0, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    idle3: {
      frame: { x: 96, y: 0, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    idle4: {
      frame: { x: 144, y: 0, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    idle5: {
      frame: { x: 192, y: 0, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    }
  },
  animations: {
    idle: ['idle1', 'idle2', 'idle3', 'idle4', 'idle5']
  },
  meta: {
    image: './src/core/sprites/playertest.png',
    format: 'RGBA8888',
    size: { w: 48, h: 48 },
    scale: "1"
  },
}

const sprite = new PIXI.Spritesheet(PIXI.BaseTexture.from(playerSpriteData.meta.image), playerSpriteData)
await sprite.parse()
const anim = new PIXI.AnimatedSprite(sprite.animations.idle)
anim.animationSpeed = 0.166
anim.play()