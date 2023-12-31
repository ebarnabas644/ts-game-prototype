import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import type { SimpleEntity } from './entity/simpleEntity'
import { Vec2 } from '@thi.ng/vectors/vec2'
import * as v from '@thi.ng/vectors'
import type { RendererSystemComponent } from './gameRenderer'

export class GameCamera {
        public viewport: Viewport
        constructor(renderer: RendererSystemComponent) {
                this.viewport = new Viewport({
                        screenHeight: renderer.pixiApp.screen.height,
                        screenWidth: renderer.pixiApp.screen.width,
                        worldHeight: 5000,
                        worldWidth: 5000,

                        events: renderer.pixiApp.renderer.events
                })

                renderer.pixiApp.stage.addChild(this.viewport)

                this.setCameraPlugins()
                this.compensateForDevicePixelRatio()
                window.addEventListener('resize', this.resizeViewport)
        }

        public setFollow(entity: SimpleEntity) {
                this.viewport.follow(entity.sprite, {
                        speed: 4,
                        acceleration: 0.1
                })
                //test
        }

        public convertLocalPositionToGlobal(position: Vec2) {
                const convertedPosition = new Vec2([0, 0])
                const cameraPosition = v.abs2(null, new Vec2([this.viewport.x, this.viewport.y]))
                v.add(convertedPosition, position, cameraPosition)
                return convertedPosition
        }

        private setCameraPlugins() {
                this.viewport
                        .wheel()
                        .decelerate({
                                minSpeed: 0.01
                        })
                        .clamp({
                                direction: 'all',
                                underflow: 'center'
                        })
                        .clampZoom({
                                minScale: 1,
                                maxScale: 3
                        })
                        .pinch()
        }

        private compensateForDevicePixelRatio() {
                this.viewport.zoom(1 / window.devicePixelRatio)
        }

        private resizeViewport() {
                console.log(this.viewport)
                this.viewport.screenHeight = window.innerHeight
                this.viewport.screenWidth = window.innerWidth
        }
}
