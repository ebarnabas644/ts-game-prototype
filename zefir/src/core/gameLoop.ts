import { renderGame } from "./gameRenderer"
import { initConnection } from "./gameNetwork"


export function initGameLoop(){
    renderGame()
    initConnection()
}
let lastTimestamp = 0;

function gameLoop(timestamp: any){
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    console.debug("Frametime: "+deltaTime)
    lastTimestamp = timestamp;

    requestAnimationFrame(gameLoop)
}