import * as PIXI from 'pixi.js'
import { GameCamera } from './gameCamera'
import type { SimpleEntity, SimpleEntityDictionary } from './entity/simpleEntity'
import type { GameState } from './gameState'
import * as v from '@thi.ng/vectors'
import { Vec2 } from '@thi.ng/vectors'

type RenderDictionary = { [key: number]: SimpleEntity }

export class RendererSystemComponent {
        public pixiApp: PIXI.Application
        public gameCamera: GameCamera
        public renderDictionary: RenderDictionary
        private maintanceQueue: Set<number>
        constructor() {
                this.pixiApp = new PIXI.Application({
                        width: window.innerWidth,
                        height: window.innerHeight,
                        backgroundColor: 0x5c812f
                })
                const canvasLocation = document.getElementById('pixiContainer')
                if (canvasLocation) {
                        canvasLocation.appendChild(this.pixiApp.view)
                }
                //globalThis.__PIXI_APP__ = this.pixiApp //for debugging pixi app with browser extension
                this.gameCamera = new GameCamera(this)
                this.renderDictionary = {}
                this.maintanceQueue = new Set()
                this.renderMap()
        }

        public Start(gameState: GameState) {
                this.pixiApp.ticker.add((delta) => {
                        this.update(gameState.gameState)
                })
        }

        public update(entities: SimpleEntityDictionary) {
                for (let index = 0; index < entities.length; index++) {
                        const entity = entities[index]
                        if (!this.isAlreadyCreated(entity.id)) {
                                this.addEntityToViewport(entity)
                        }
                        this.updatePosition(entity)
                        this.maintanceQueue.delete(entity.id)
                }
                this.removeDestroyedEntities()
                this.copyMaintanceQueue()
        }

        private isAlreadyCreated(id: number) {
                return this.renderDictionary[id]
        }

        private updatePosition(entityDTO: SimpleEntity) {
                let interpolated = new Vec2()
                v.mixN2(
                        interpolated,
                        [
                                this.renderDictionary[entityDTO.id].sprite.x,
                                this.renderDictionary[entityDTO.id].sprite.y
                        ],
                        [entityDTO.position.x, entityDTO.position.y],
                        0.4
                )
                this.renderDictionary[entityDTO.id].sprite.x = interpolated.x
                this.renderDictionary[entityDTO.id].sprite.y = interpolated.y
        }

        private removeDestroyedEntities() {
                this.maintanceQueue.forEach((id) => {
                        this.gameCamera.viewport.removeChild(
                                this.renderDictionary[Number(id)].sprite
                        )
                        delete this.renderDictionary[Number(id)]
                })
        }

        private copyMaintanceQueue() {
                this.maintanceQueue.clear()
                for (const key in this.renderDictionary) {
                        this.maintanceQueue.add(Number(key))
                }
        }

        private addEntityToViewport(entity: SimpleEntity) {
                const sprite = entity.sprite
                sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
                this.gameCamera.viewport.addChild(sprite)
                this.renderDictionary[entity.id] = entity
        }

        private renderMap() {
                try {
                        let map = PIXI.Sprite.from(
                                'https://firebasestorage.googleapis.com/v0/b/project-zefir.appspot.com/o/zefir.png?alt=media'
                        )
                        map.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
                        this.gameCamera.viewport.addChild(map)
                } catch {
                        console.log('image failed to load')
                }
        }
}
