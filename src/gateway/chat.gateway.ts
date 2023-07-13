
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
  },
})
export class AppGateway
implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');
    
    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        this.server.emit('msgToClient', payload);
    }
    
    afterInit(server: Server) {
        this.logger.log('Init');
    }
    
    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.server.emit('msgToClient', { name: client.id, text: 'disconnected' });
    }
    
    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        this.server.emit('msgToClient', { name: client.id, text: 'connected' });
    }
}

// import { Logger } from "@nestjs/common/services/logger.service";
// import { MessageBody,SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

// import { Socket, Server } from 'socket.io';

// @WebSocketGateway(3001, { namespace: '/chat' })
// export class ChatGateway {
//     // @WebSocketServer()
//     // serverSocket ;
//     @WebSocketServer() serverSocket: Server;
//  private logger: Logger = new Logger('AppGateway');

//     // handleConnection(client: Socket, ...args: any[]) {
//     //     console.log('Client connected: ' + client);
//     // }

//     // handleDisconnect(client: Socket) {
//     //     console.log('Client disconnected: ' + client);
//     // }

//     @SubscribeMessage('message')
//     handleMessage(@MessageBody() message:string) {
//         console.log('Message received: ' + message);
//         this.serverSocket.emit('message', message);
//     }

//     handleDisconnect(client: Socket) {
//         this.logger.log(`Client disconnected: ${client.id}`);
//        }

//        handleConnection(client: Socket, ...args: any[]) {
//         this.logger.log(`Client connected: ${client.id}`);
//        }

// }