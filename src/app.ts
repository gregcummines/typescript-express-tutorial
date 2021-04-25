import * as express from 'express';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import "reflect-metadata";
import {container} from "tsyringe";
import {WebSocketServer} from "./websockets/websocket-server";
import * as WebSocket from 'ws';
import * as http from 'http';

class App {
  public app: express.Application;
  public port: number;

  private wss: WebSocketServer;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.wss = container.resolve(WebSocketServer);
    
    //initialize a simple http server
    const server = http.createServer(this.app);

    //initialize the WebSocket server instance
    const wss = new WebSocket.Server({ port: 5002 });
    this.wss.setWss(wss);

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }
 
  private initializeMiddlewares() {
    this.app.use(express.json());
  }
 
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;