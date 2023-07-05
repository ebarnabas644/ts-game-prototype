type EntityDTO = {
    id: number,
    health: number,
    position: { x: number, y: number },
    sprite: string
}

type EntityDTODictionary = { [key: string]: EntityDTO[]}