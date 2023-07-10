import { convertEntityDTODictionaryToSimpleEntityDictionary, type EntityDTODictionary } from "./entity/entityDTO";
import type { SimpleEntityDictionary } from "./entity/simpleEntity";

export let store;

export function setStore(storeToSet: any){
    store = storeToSet
}

export function setGameState(state: any){
    
}

export class GameState{
    public gameState: SimpleEntityDictionary

    constructor(){
        this.gameState = []
    }

    updateGameState(state: EntityDTODictionary){
        store.entities = state
        this.gameState = convertEntityDTODictionaryToSimpleEntityDictionary(state)
    }
}