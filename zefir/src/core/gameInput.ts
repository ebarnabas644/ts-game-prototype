import { emitCustomEvent } from "./utilities/customEventEmitter"

export class InputSystemComponent{
    private pushedButtons: Set<string>
    constructor(){
        this.pushedButtons = new Set()

        document.addEventListener('keydown', (event) => {
            if(event.key == "ArrowLeft"){
                this.pushedButtons.add('leftMoveCommand')
            }
            if(event.key == "ArrowRight"){
                this.pushedButtons.add('rightMoveCommand')
            }
            if(event.key == "ArrowUp"){
                this.pushedButtons.add('upMoveCommand')
            }
            if(event.key == "ArrowDown"){
                this.pushedButtons.add('downMoveCommand')
            }
            emitCustomEvent('playerInput', this.pushedButtons)
          })
        document.addEventListener('keyup', (event) => {
        if(event.key == "ArrowLeft"){
            this.pushedButtons.delete('leftMoveCommand')
        }
        if(event.key == "ArrowRight"){
            this.pushedButtons.delete('rightMoveCommand')
        }
        if(event.key == "ArrowUp"){
            this.pushedButtons.delete('upMoveCommand')
        }
        if(event.key == "ArrowDown"){
            this.pushedButtons.delete('downMoveCommand')
        }
        emitCustomEvent('playerInput', this.pushedButtons)
        })
    }
}