import { NetworkSystemComponent } from './gameNetwork'
import { RendererSystemComponent } from './gameRenderer'
import { store } from './gameState'
import { InputSystemComponent } from './gameInput'
import { GameState } from './gameState'
import { SpriteLibrary } from './data/spriteLibrary'
import { SpritesheetBuilder } from './utilities/spriteSheetBuilder'

export let networkSystemComponent: NetworkSystemComponent
export let rendererSystemComponent: RendererSystemComponent
export let inputSystemComponent: InputSystemComponent
export let gameState: GameState
export let spriteLibrary: SpriteLibrary

let counter = 0
export async function initGame() {
        networkSystemComponent = new NetworkSystemComponent()
        networkSystemComponent.initConnection()
        spriteLibrary = new SpriteLibrary('./src/core/sprites/', new SpritesheetBuilder())
        await spriteLibrary.initTextures()
        document.addEventListener('playerReceived', (event) => {
                gameState = new GameState()
                inputSystemComponent = new InputSystemComponent()
                rendererSystemComponent = new RendererSystemComponent()
                rendererSystemComponent.Start(gameState)
                document.addEventListener('stateReceived', (event: any) => {
                        gameState.updateGameState(event.detail)
                        // TODO: Hell no pls fix this future me
                        if (counter == 0) {
                                const findControlled = gameState.gameState.find(
                                        (entity) =>
                                                entity.tags['controlledby'] ==
                                                networkSystemComponent.getConnectionId()
                                )
                                if (findControlled) {
                                        //gameCamera.setFollow(findControlled)
                                        rendererSystemComponent.gameCamera.viewport
                                                .wheel()
                                                .decelerate({
                                                        minSpeed: 0.01
                                                })
                                                .clamp({
                                                        direction: 'all'
                                                })
                                                .clampZoom({
                                                        minScale: 1,
                                                        maxScale: 3
                                                })
                                                .follow(findControlled.sprite, {
                                                        speed: 20
                                                })
                                }
                                counter++
                                console.log('camera set')
                        }
                })
                store.isLoading = false
        })
}
