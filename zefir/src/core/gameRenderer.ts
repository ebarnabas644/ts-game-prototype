let pos = 50

export function renderGame(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "red";
    ctx.fillRect(pos, 50, 100, 100)
    pos++
}