import type { SpritesheetBuilder } from '../utilities/spriteSheetBuilder'
import { type Sheet } from '../types/sheet'

export class SpriteLibrary{
    private basePath: string
    private textureCollection: {[key: string]: { [key: string]: Sheet }}
    private spritesheetBuilder: SpritesheetBuilder

    constructor(basePath: string, spritesheetBuilder: SpritesheetBuilder){
        this.basePath = basePath
        this.textureCollection = {}
        this.spritesheetBuilder = spritesheetBuilder
    }

    async initTextures(){
        await this.loadPlayer()
    }

    private async loadPlayer(){
        const fileName = 'player.png'
        this.spritesheetBuilder.setMetaData(this.basePath + fileName, { w: 48, h: 48 })
        this.spritesheetBuilder.addRow('idle', { x: 0, y: 0 }, 6)
        this.spritesheetBuilder.addRow('idleRight', { x: 0, y: 48 }, 6)
        this.spritesheetBuilder.addRow('idleLeft', { x: 0, y: 48 }, 6)
        this.spritesheetBuilder.addRow('idleUp', { x: 0, y: 96 }, 6)
        this.spritesheetBuilder.addRow('runDown', { x: 0, y: 144 }, 6)
        this.spritesheetBuilder.addRow('run', { x: 0, y: 192 }, 6) //right
        this.spritesheetBuilder.addRow('runLeft', { x: 0, y: 192 }, 6)
        this.spritesheetBuilder.addRow('runUp', { x: 0, y: 240 }, 6)
        this.spritesheetBuilder.addRow('meleeDown', { x: 0, y: 288 }, 4)
        this.spritesheetBuilder.addRow('meleeRight', { x: 0, y: 336 }, 4)
        this.spritesheetBuilder.addRow('meleeLeft', { x: 0, y: 336 }, 4)
        this.spritesheetBuilder.addRow('meleeUp', { x: 0, y: 384 }, 4)
        this.spritesheetBuilder.addRow('knockout', { x: 0, y: 432 }, 3)
        const assembledTextures = await this.spritesheetBuilder.build()
        this.textureCollection[fileName] = assembledTextures
        this.spritesheetBuilder.clear()
    }

    public getSheet(name: string){
        return this.textureCollection[name]
    }
}