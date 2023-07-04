import { Component } from './component'
import { rendererSystemComponent } from '@/core/gameMain'
import * as PIXI from 'pixi.js'
import { PositionComponent } from './positionComponent'
import type { IScript } from '../Interfaces/IScript'

export class SpriteComponent extends Component implements IScript {
    private sprite: PIXI.Sprite
  constructor(public spritePath: string){
    super()
    this.sprite = PIXI.Sprite.from(this.spritePath)
  }

  public init(){
    const pixiApp = rendererSystemComponent.pixiApp

    pixiApp.stage.addChild(this.sprite)
    console.log(this.entity)
    const positionComponent = this.entity?.getComponent('position') as PositionComponent
    if(positionComponent){
        this.sprite.x = positionComponent.position.x
        this.sprite.y = positionComponent.position.y
        console.log("Pos set")
    }
  }

  public update(delta: number): void {
    const positionComponent = this.entity?.getComponent('position') as PositionComponent
    if(positionComponent){
        this.sprite.x = positionComponent.position.x
        this.sprite.y = positionComponent.position.y
    }
  }
}