import { emitCustomEvent } from "./utilities/customEventEmitter"

export class InputSystemComponent{
    private pushedButtons: Set<string>
    private previous: Set<string>
    constructor(){
        this.pushedButtons = new Set()
        this.previous = new Set()

        document.addEventListener('keydown', (event) => {
            this.previous = new Set(this.pushedButtons)
            if(event.key == "ArrowLeft" || event.key == "a"){
                this.pushedButtons.add('leftMoveCommand')
            }
            if(event.key == "ArrowRight" || event.key == "d"){
                this.pushedButtons.add('rightMoveCommand')
            }
            if(event.key == "ArrowUp" || event.key == "w"){
                this.pushedButtons.add('upMoveCommand')
            }
            if(event.key == "ArrowDown" || event.key == "s"){
                this.pushedButtons.add('downMoveCommand')
            }

            if(!this.previouslyPressedEqualsCurrentlyPressed()){
                emitCustomEvent('playerInput', this.pushedButtons)
            }
          })
        document.addEventListener('keyup', (event) => {
        if(event.key == "ArrowLeft" || event.key == "a"){
            this.pushedButtons.delete('leftMoveCommand')
        }
        if(event.key == "ArrowRight" || event.key == "d"){
            this.pushedButtons.delete('rightMoveCommand')
        }
        if(event.key == "ArrowUp" || event.key == "w"){
            this.pushedButtons.delete('upMoveCommand')
        }
        if(event.key == "ArrowDown" || event.key == "s"){
            this.pushedButtons.delete('downMoveCommand')
        }
        emitCustomEvent('playerInput', this.pushedButtons)
        })
    }

    private previouslyPressedEqualsCurrentlyPressed(){
        for (const button of this.pushedButtons) {
            if(!this.previous.has(button)){
                return false
            }
        }

        return true
    }
}