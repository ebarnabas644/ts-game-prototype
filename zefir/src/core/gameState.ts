import { convertEntityDTODictionaryToSimpleEntityDictionary, type EntityDTODictionary, convertEntityDTOtoSimpleEntity, type EntityDTO } from "./entity/entityDTO";
import type { SimpleEntity, SimpleEntityDictionary } from "./entity/simpleEntity";

export let store;

export function setStore(storeToSet: any){
    store = storeToSet
}

export function setGameState(state: any){
    
}

export class GameState{
    public gameState: SimpleEntityDictionary
    private counter
    private uiRefreshRate
    private objectHistory: Set<number>

    constructor(){
        this.gameState = []
        this.uiRefreshRate = 1
        this.counter = 0
        this.objectHistory = new Set()
    }

    updateGameState(state: EntityDTODictionary){
        if(this.counter % this.uiRefreshRate == 0){
            store.entities = state
        }
        for (let index = 0; index < state.length; index++) {
            const element = state[index];
            const isEntityAlreadyExists = this.gameState.find(entity => entity.id == element.id)
            if(!isEntityAlreadyExists){
                this.createSimpleEntityFromDTO(element)
            }
            else{
                this.updateSimpleEntity(isEntityAlreadyExists, element)
            }
            this.objectHistory.delete(element.id)
        }
        
        this.removeUnusedEntities()
        this.createObjectHistory()
        this.counter++
    }

    private createSimpleEntityFromDTO(entityDTO: EntityDTO){
        this.gameState.push(convertEntityDTOtoSimpleEntity(entityDTO))
    }

    private updateSimpleEntity(element: SimpleEntity, updatedData: EntityDTO){
        element.position.x = updatedData.position.x
        element.position.y = updatedData.position.y
        element.setState(updatedData.state)
    }

    private removeUnusedEntities(){
        for (const id of this.objectHistory) {
            const entityToRemove = this.gameState.find(entity => entity.id == id)
            if(entityToRemove){
                const indexToRemove = this.gameState.indexOf(entityToRemove)
                this.gameState.splice(indexToRemove, 1)
                entityToRemove.release()
            }
        }
    }

    private createObjectHistory(){
        this.objectHistory.clear()
        for (let index = 0; index < this.gameState.length; index++) {
            this.objectHistory.add(this.gameState[index].id)
        }
    }
}