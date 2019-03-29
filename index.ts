import path from 'path';
import express from 'express';
import serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';

// Import demo room handlers
import { ChatRoom } from "./rooms/01-chat-room";
import { StateHandlerRoom } from "./rooms/02-state-handler";
import { AuthRoom } from "./rooms/03-auth";
import { CreateOrJoinRoom } from "./rooms/04-create-or-join-room";

const port = Number(process.env.PORT || 2567);
const app = express();

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
  server: createServer(app)
});

// Register ChatRoom as "chat"
gameServer.register("chat", ChatRoom);

// Register ChatRoom with initial options, as "chat_with_options"
// onInit(options) will receive client join options + options registered here.
gameServer.register("chat_with_options", ChatRoom, {
    custom_options: "you can use me on Room#onInit"
});

// Register StateHandlerRoom as "state_handler"
gameServer.register("state_handler", StateHandlerRoom);

// Register StateHandlerRoom as "state_handler"
gameServer.register("auth", AuthRoom);

// Register CreateOrJoin as "create_or_join"
gameServer.register("create_or_join", CreateOrJoinRoom);

app.use('/', express.static(path.join(__dirname, "static")));
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))

// (optional) attach web monitoring panel
app.use('/colyseus', monitor(gameServer));

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

gameServer.listen(port);

// process.on("uncaughtException", (e) => {
//   console.log(e.stack);
//   process.exit(1);
// });

console.log(`Listening on http://localhost:${ port }`);
