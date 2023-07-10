import { SimpleEntity, type SimpleEntityDictionary } from "./simpleEntity"

export type EntityDTO = {
    id: number,
    name: string
    health: number,
    position: { x: number, y: number },
    sprite: string,
    tags: {[key: string]: any}
}

export type EntityDTODictionary = EntityDTO[]

export function convertEntityDTOtoSimpleEntity(entityDTO: EntityDTO){
    return new SimpleEntity(entityDTO.id, entityDTO.name, entityDTO.position, './src/core/sprites/'+entityDTO.sprite, entityDTO.health, entityDTO.tags)
}

export function convertEntityDTODictionaryToSimpleEntityDictionary(entityDTODictionary: EntityDTODictionary){
    const simpleEntityDictionary: SimpleEntityDictionary = []
    for (let index = 0; index < entityDTODictionary.length; index++) {
        const element = convertEntityDTOtoSimpleEntity(entityDTODictionary[index]);
        simpleEntityDictionary.push(element)
    }

    return simpleEntityDictionary
}