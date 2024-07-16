import { config, Server, startDB } from '../config';
import app from './app';
//import { Server as SocketIO, ServerOptions } from 'socket.io';

// import { bootstrapProject } from './services/bootstrap';

const path = '/api/v1';
const port = config.port;

//let pushServer: SocketIO; // pushServer doesn't have a value
export const startServer = () => {
  const server = Server(app, port, path);
  if (config.env === 'test'){
    /**
     * Mock servers may be called at test point
     */
    return server.test();
  }
  const dbManager = startDB();
  dbManager.live(
    () => {
      // bootstrapProject(process.argv.slice(2));
       //pushServer = new SocketIO(MainServer.httpServer);
      // console.log(pushServer);

      // pushServer.use(SocketHandler.authTokenMiddleware);
      // pushServer.use(SocketHandler.authIdentityMiddleware);
      
      // pushServer.on('connection', SocketHandler.connectionHandler);    
      
    }
  );
  return server.live();
};

// export default startServer();

export const MainServer = {
  httpServer: startServer(),
  // ioServerOptions: {
  //   cors: {
  //     origin: config.hostUrl,
  //     credentials: true
  //   }
  // } as Partial<ServerOptions>
};

// concurrency
// callback 