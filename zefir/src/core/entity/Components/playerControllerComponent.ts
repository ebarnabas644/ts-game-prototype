import { Component } from './component'
import { type IScript } from '../Interfaces/IScript'
import { PositionComponent } from './positionComponent'
import { HealthComponent } from './healthComponent'

export class PlayerControllerComponent extends Component implements IScript{
    constructor() {
      super()
      this.initController()
    }
  
    private initController(){
      document.addEventListener('keydown', (event) => {
        if(event.key == "ArrowDown"){
          let positionComponent = this.entity?.getComponent('position') as PositionComponent
          if(positionComponent){
            positionComponent.position.y += 10
          }
        }
        if(event.key == "ArrowUp"){
          let positionComponent = this.entity?.getComponent('position') as PositionComponent
          if(positionComponent){
            positionComponent.position.y -= 10
          }
        }
        if(event.key == "ArrowRight"){
          let positionComponent = this.entity?.getComponent('position') as PositionComponent
          if(positionComponent){
            positionComponent.position.x += 10
          }
        }
        if(event.key == "ArrowLeft"){
          let positionComponent = this.entity?.getComponent('position') as PositionComponent
          if(positionComponent){
            positionComponent.position.x -= 10
          }
        }
        if(event.key == "k"){
          let healthComponent = this.entity?.getComponent('health') as HealthComponent
          if(healthComponent){
            //healthComponent.health -= 10
            //store.modifyEntity('player', player)
            //store.players['player'].components.health.health -= 10
            healthComponent.health -= 10 // TODO: store whole game state in pinia store
            console.log("Damage taken, remaining health: "+healthComponent.health)
            //player.addComponent('position'+counter, new PositionComponent(100,50))
          }
        }
        console.log(event.key)
      })
    }
  
    public update(delta: number): void {
      
    }
  
  
  }