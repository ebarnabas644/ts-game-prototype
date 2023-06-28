import { renderGame } from "./gameRenderer"

let ctx: CanvasRenderingContext2D
let canvas: HTMLCanvasElement

export function initGameLoop(){
    canvas = document.getElementById("myCanvas") as HTMLCanvasElement
    let ctxFound = canvas.getContext("2d")
    if(ctxFound){
        ctx = ctxFound
        gameLoop(0)
    }
}
let lastTimestamp = 0;

function gameLoop(timestamp: any){
    const deltaTime = (timestamp - lastTimestamp) / 1000;
    console.log(deltaTime)
    lastTimestamp = timestamp;

    renderGame(ctx, canvas)
    requestAnimationFrame(gameLoop)
}