import { Entity } from '../entity'

export abstract class Component{
    protected entity?: Entity
  
    public onAttach(entity: Entity){
      this.entity = entity
    }
  
    public onDetach(entity: Entity){
      this.entity = undefined
    }
  }