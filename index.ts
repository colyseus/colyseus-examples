import express from 'express';
import serveIndex from 'serve-index';
import path from 'path';
import cors from 'cors';
import { createServer } from 'http';
import { Server, LobbyRoom, RelayRoom } from 'colyseus';
import { monitor } from '@colyseus/monitor';

// Import demo room handlers
import { ChatRoom } from "./rooms/01-chat-room";
import { StateHandlerRoom } from "./rooms/02-state-handler";
import { AuthRoom } from "./rooms/03-auth";
import { ReconnectionRoom } from './rooms/04-reconnection';
import { CustomLobbyRoom } from './rooms/07-custom-lobby-room';

const port = Number(process.env.PORT || 2567) + Number(process.env.NODE_APP_INSTANCE || 0);
const app = express();

app.use(cors());
app.use(express.json());

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
  server: createServer(app),
  express: app,
  pingInterval: 0,
});

// Define "lobby" room
gameServer.define("lobby", LobbyRoom);

// Define "relay" room
gameServer.define("relay", RelayRoom, { maxClients: 4 })
    .enableRealtimeListing();

// Define "chat" room
gameServer.define("chat", ChatRoom)
    .enableRealtimeListing();

// Register ChatRoom with initial options, as "chat_with_options"
// onInit(options) will receive client join options + options registered here.
gameServer.define("chat_with_options", ChatRoom, {
    custom_options: "you can use me on Room#onCreate"
});

// Define "state_handler" room
gameServer.define("state_handler", StateHandlerRoom)
    .enableRealtimeListing();

// Define "auth" room
gameServer.define("auth", AuthRoom)
    .enableRealtimeListing();

// Define "reconnection" room
gameServer.define("reconnection", ReconnectionRoom)
    .enableRealtimeListing();

// Define "custom_lobby" room
gameServer.define("custom_lobby", CustomLobbyRoom);

app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))
app.use('/', express.static(path.join(__dirname, "static")));

// (optional) attach web monitoring panel
app.use('/colyseus', monitor());

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

gameServer.listen(port);

// process.on("uncaughtException", (e) => {
//   console.log(e.stack);
//   process.exit(1);
// });

console.log(`Listening on http://localhost:${ port }`);
