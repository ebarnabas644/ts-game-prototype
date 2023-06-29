import { io, Socket } from 'socket.io-client'

const socket: Socket = io('http://localhost:3000')

export function initConnection(){
    // Event: Connection opened
    socket.on('connect', () => {
      console.log('Connected to the server');
  });
    socket.on('response', (message: string) => {
      console.log('Received response: '+ message)
      const event = new CustomEvent('chatMessage', {detail: message})

      document.dispatchEvent(event)
    })
}

export function getConnectionId(): string{
  return socket.id
}

export function sendMessage(event: string, message: string){
  socket.emit(event, message)
}