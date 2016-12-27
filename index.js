const path = require('path');
const colyseus = require('colyseus');
const http = require('http');
const express = require('express');
const serveIndex = require('serve-index');
const port = process.env.PORT || 2657;
const app = express();

// Create HTTP Server
const server = http.createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new colyseus.Server({ server: server });

// Require Chat
const ChatRoom = require('./rooms/01-basic');

// Register ChatRoom as "chat"
gameServer.register("chat", ChatRoom);

app.use(express.static(path.join(__dirname, "static")));
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))

server.listen(port);

console.log(`Listening on http://localhost:${ port }`);
