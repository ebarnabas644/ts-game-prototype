type EntityDTO = {
    id: number,
    health: number,
    position: { x: number, y: number },
    sprite: string,
    tags: {[key: string]: any}
}

type EntityDTODictionary = { [key: string]: EntityDTO[]}