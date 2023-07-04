import { Entity } from '../entity'
import { store } from '@/core/gameState'

export abstract class Component{
    protected entity?: Entity
  
    public onAttach(entity: Entity){
      this.entity = store.players[entity.name]
    }
  
    public onDetach(entity: Entity){
      this.entity = undefined
    }
  }