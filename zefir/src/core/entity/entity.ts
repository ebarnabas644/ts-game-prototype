import { Component } from './Components/component'
import { store } from '../gameState'
import type { IScript } from './Interfaces/IScript';

// Entity class
export class Entity {
  components: { [key: string]: any };
  name: string

  constructor(name: string) {
    this.components = {};
    this.name = name
    store.players[name] = this
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

  updateComponents(delta: number){
    for (const key in this.components){
      const component = this.components[key]
      if(this.isScriptComponent(component)){
        component.update(delta)
      }
    }
  }

  private isScriptComponent(component: any): component is IScript{
    return 'update' in component
  }
}