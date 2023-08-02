import { store } from '../gameState'
import { SpritesheetBuilder } from '../utilities/spriteSheetBuilder'
import { spriteLibrary } from '../gameMain'
import { type Sheet } from '../types/sheet'
import * as PIXI from 'pixi.js'

export type SimpleEntityDictionary = SimpleEntity[]
// Entity class
export class SimpleEntity {
        id: number
        name: string
        position: { x: number; y: number }
        sprite: PIXI.AnimatedSprite
        state: string
        health: number
        tags: { [key: string]: any }
        spriteSheet: { [key: string]: Sheet }
        flipped: boolean

        constructor(
                id: number,
                name: string,
                position: { x: number; y: number },
                spritePath: string,
                health: number,
                tags: { [key: string]: any },
                state: string
        ) {
                this.id = id
                this.name = name
                this.position = {
                        x: position.x,
                        y: position.y
                }
                this.spriteSheet = spriteLibrary.getSheet(spritePath)
                this.health = health
                this.state = state
                this.sprite = new PIXI.AnimatedSprite(this.spriteSheet[this.state].textures)
                this.sprite.anchor.x = 0.5
                this.sprite.anchor.y = 0.5
                this.sprite.animationSpeed = 0.166
                this.sprite.play()
                this.sprite.x = position.x
                this.sprite.y = position.y
                this.tags = tags
                this.flipped = false
        }

        release() {
                this.sprite.destroy()
        }

        setState(newState: string) {
                if (this.state != newState) {
                        this.state = newState
                        this.sprite.stop()
                        if (this.spriteSheet[this.state].options.horizontalInvert) {
                                this.sprite.scale.x *= -1
                                this.flipped = true
                        } else if (this.flipped) {
                                this.sprite.scale.x = Math.abs(this.sprite.scale.x)
                                this.flipped = false
                        }
                        this.sprite.textures = this.spriteSheet[this.state].textures
                        this.sprite.gotoAndPlay(0)
                }
        }
}
