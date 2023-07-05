import { io, Socket } from 'socket.io-client'
import { emitCustomEvent } from './utilities/customEventEmitter';

export class NetworkSystemComponent{
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000')
    document.addEventListener('keydown', (event) => {
      if(event.key == "ArrowLeft"){
        this.socket.emit('leftMove')
      }
    })
  }
  
  public initConnection(){
      this.socket.on('connect', () => {
        console.log('Connected to the server');
        this.socket.emit('newPlayer')
        this.registerPlayerCommandEvents()
    });
      this.socket.on('response', (message: string) => {
        console.log('Received response: '+ message)
        const event = new CustomEvent('chatMessage', {detail: message})
  
        document.dispatchEvent(event)
      })
      this.socket.on('state', (entites: EntityDTODictionary) => {
        emitCustomEvent('stateReceived', entites)
      })
  }
  
  public getConnectionId(): string{
    return this.socket.id
  }
  
  public sendMessage(event: string, message: string){
    this.socket.emit(event, message)
  }

  private registerPlayerCommandEvents(){
    document.addEventListener('playerInput', (event: Event) => {
      console.log(event.detail)
      const commands: string[] = []
      event.detail.forEach(command => {
        commands.push(command)
      });
      this.socket.emit('playerCommand', commands)
    })
  }

}