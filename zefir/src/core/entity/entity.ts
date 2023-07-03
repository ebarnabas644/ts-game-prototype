import { Component } from './Components/component'

let store;

export interface IScript{
  update(delta: number): void
}

// Component classes
class PositionComponent extends Component {
  constructor(public x: number, public y: number) {super()}
}

class HealthComponent extends Component {
  constructor(public health: number) {
    super()
  }
}

class SpriteComponent extends Component {
  
}

class EnemyAIComponent extends Component {
  constructor() {super()}
}

class PlayerControllerComponent extends Component implements IScript{
  constructor() {
    super()
    this.initController()
  }

  private initController(){
    document.addEventListener('keydown', (event) => {
      if(event.key == "ArrowDown"){
        let positionComponent = this.entity?.getComponent('position') as PositionComponent
        if(positionComponent){
          positionComponent.y -= 1
        }
        console.log(positionComponent.y)
      }
      if(event.key == "k"){
        let healthComponent = this.entity?.getComponent('health') as HealthComponent
        if(healthComponent){
          healthComponent.health -= 10
          store.health[0].health.current = healthComponent.health // TODO: store whole game state in pinia store
          console.log("Damage taken, remaining health: "+healthComponent.health)
        }
      }
      console.log(event.key)
    })
  }

  public update(delta: number): void {
    throw new Error("Method not implemented.")
  }


}

// Entity class
export class Entity {
  components: { [key: string]: any };

  constructor() {
    this.components = {};
  }

  addComponent(componentName: string, component: Component) {
    component.onAttach(this)
    this.components[componentName] = component;
  }

  getComponent(componentName: string): Component {
    return this.components[componentName];
  }

  removeComponent(componentName: string) {
    this.components[componentName].onDetach()
    delete this.components[componentName];
  }
}

export const player = new Entity()
player.addComponent('position', new PositionComponent(100,50))
player.addComponent('health', new HealthComponent(50))
player.addComponent('playerController', new PlayerControllerComponent())

export const playerHealth = player.getComponent('health') as HealthComponent

function emitCustomEvent(eventName: string, payload: any) {
  const event = new CustomEvent(eventName, { detail: payload });
  document.dispatchEvent(event);
}

function updatePlayerStats(){
    emitCustomEvent('updateStore', player)
}
document.addEventListener('storeReady', (event) => {
  store = event.detail
  let healthComponent = player.getComponent('health') as HealthComponent
  store.health[0].health.current = healthComponent.health
})