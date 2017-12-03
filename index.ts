import * as path from 'path';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';

// Require BasicRoom handler
import { BasicRoom } from "./rooms/01-basic";
import { StateHandlerRoom } from "./rooms/02-state-handler";
import { AuthRoom } from "./rooms/03-auth";

const port = Number(process.env.PORT || 2657);
const app = express();

// Create HTTP Server
const httpServer = createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({ server: httpServer });

// Register BasicRoom as "basic"
gameServer.register("basic", BasicRoom);

// Register BasicRoom with initial options, as "basic_with_options"
// onInit(options) will receive client join options + options registered here.
gameServer.register("basic_with_options", BasicRoom, {
    custom_options: "you can use me on Room#onInit"
});

// Register StateHandlerRoom as "state_handler"
gameServer.register("state_handler", StateHandlerRoom);

// Register StateHandlerRoom as "state_handler"
gameServer.register("auth", AuthRoom);

app.use(express.static(path.join(__dirname, "static")));
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))

gameServer.listen(port);

console.log(`Listening on http://localhost:${ port }`);