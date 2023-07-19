import { io, Socket } from 'socket.io-client'
import { emitCustomEvent } from './utilities/customEventEmitter';
import type { EntityDTO, EntityDTODictionary } from './entity/entityDTO';

export class NetworkSystemComponent{
  private socket: Socket;

  constructor() {
    this.socket = io('http://35.233.97.188:3000')
  }
  
  public initConnection(){
      this.socket.on('connect', () => {
        console.log('Connected to the server');
    });
      this.socket.on('response', (message: string) => {
        emitCustomEvent('chatMessage', message)
      })
      this.socket.on('state', (entities: EntityDTODictionary) => {
        emitCustomEvent('stateReceived', entities)
      })

      this.socket.on('playerCreated', () => {
        emitCustomEvent('playerReceived', '')
      })
  }

  public sendConnectionRequest(name: string){
    this.socket.emit('newPlayer', name)
    this.registerPlayerCommandEvents()
  }
  
  public getConnectionId(): string{
    return this.socket.id
  }
  
  public sendMessage(event: string, message: string){
    this.socket.emit(event, message)
  }

  private registerPlayerCommandEvents(){
    document.addEventListener('playerInput', (event: any) => {
      const commands: string[] = []
      event.detail.forEach((command: any) => {
        commands.push(command)
      });
      this.socket.emit('playerCommand', commands)
    })
  }

}