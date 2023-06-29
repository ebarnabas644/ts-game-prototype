import * as PIXI from 'pixi.js'
import { type Player } from './models/player'

let pixiApp: PIXI.Application;

let pos = 50

export function setPIXI(app: PIXI.Application){
    pixiApp = app
}

export function renderGame(){
    let sprite = PIXI.Sprite.from('./plane.png')
    pixiApp.stage.addChild(sprite)

    let elapsed = 0.0;
    // Tell our application's ticker to run a new callback every frame, passing
    // in the amount of time that has passed since the last tick
    pixiApp.ticker.add((delta) => {
    // Add the time to our total elapsed time
    elapsed += delta;
    // Update the sprite's X position based on the cosine of our elapsed time.  We divide
    // by 50 to slow the animation down a bit...
    sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
  });
}

function createPlayer(player: Player){
  let sprite = PIXI.Sprite.from('./plane.png')
  pixiApp.stage.addChild(sprite)
}

function drawPlayer(player: Player){
  let sprite = PIXI.Sprite.from('./plane.png')
  sprite.x = player.x
  sprite.y = player.y
  sprite.height = player.height
  sprite.width = player.width
}