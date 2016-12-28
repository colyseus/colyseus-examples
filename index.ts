import * as path from 'path';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';

// Require ChatRoom handler
import { ChatRoom } from "./rooms/01-basic";

const port = process.env.PORT || 2657;
const app = express();

// Create HTTP Server
const httpServer = createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({ server: httpServer });

// Register ChatRoom as "chat"
gameServer.register("chat", ChatRoom);

app.use(express.static(path.join(__dirname, "static")));
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))

httpServer.listen(port);

console.log(`Listening on http://localhost:${ port }`);
