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
  state: string
  health: number
  tags: {[key: string]: any}
  idleDownSprite: PIXI.AnimatedSprite
  runSprite: PIXI.AnimatedSprite

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

const playerSpriteData = {
  frames: {
    idleDown1: {
      frame: { x: 0, y: 0, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    idleDown2: {
      frame: { x: 48, y: 0, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    idleDown3: {
      frame: { x: 96, y: 0, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    idleDown4: {
      frame: { x: 144, y: 0, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    idleDown5: {
      frame: { x: 192, y: 0, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    run1: {
      frame: { x: 0, y: 192, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    run2: {
      frame: { x: 48, y: 192, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    run3: {
      frame: { x: 96, y: 192, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    run4: {
      frame: { x: 144, y: 192, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    run5: {
      frame: { x: 192, y: 192, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    },
    run6: {
      frame: { x: 240, y: 192, w: 48, h:48 },
      sourceSize: { w: 48, h: 48},
      spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 }
    }
  },
  animations: {
    idleDown: ['idleDown1', 'idleDown2', 'idleDown3', 'idleDown4', 'idleDown5'],
    run: ['run1', 'run2', 'run3', 'run4', 'run5', 'run6']
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
const anim = new PIXI.AnimatedSprite(sprite.animations.idleDown)
const runanim = new PIXI.AnimatedSprite(sprite.animations.run)
anim.animationSpeed = 0.166
anim.play()