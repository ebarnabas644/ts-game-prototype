import { io, Socket } from 'socket.io-client'

export class NetworkSystemComponent{
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000')
  }
  
  public initConnection(){
      this.socket.on('connect', () => {
        console.log('Connected to the server');
    });
      this.socket.on('response', (message: string) => {
        console.log('Received response: '+ message)
        const event = new CustomEvent('chatMessage', {detail: message})
  
        document.dispatchEvent(event)
      })
  }
  
  public getConnectionId(): string{
    return this.socket.id
  }
  
  public sendMessage(event: string, message: string){
    this.socket.emit(event, message)
  }
}