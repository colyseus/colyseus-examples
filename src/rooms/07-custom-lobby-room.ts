import { Schema, type } from "@colyseus/schema";
import { Client, LobbyRoom } from "colyseus";

class LobbyState extends Schema {
    @type("string") custom: string ;
}

export class CustomLobbyRoom extends LobbyRoom {
    state = new LobbyState();

    async onCreate(options) {
        await super.onCreate(options);

    }

    onJoin(client: Client, options) {
        super.onJoin(client, options);
        this.state.custom = client.sessionId;
    }

    onLeave(client) {
        super.onLeave(client);
    }
}