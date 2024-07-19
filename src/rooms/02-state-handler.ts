import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
    @type("number") x = Math.floor(Math.random() * 400);
    @type("number") y = Math.floor(Math.random() * 400);
}

export class State extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();

    untyped_attribute = "This attribute won't be sent to the client-side";
}

export class StateHandlerRoom extends Room {
    maxClients = 4;
    state = new State();

    onCreate (options) {
        console.log("StateHandlerRoom created!", options);

        this.onMessage("move", (client, data) => {
            console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
            const player = this.state.players.get(client.sessionId);
            if (data.x) {
                player.x += data.x * 10;

            } else if (data.y) {
                player.y += data.y * 10;
            }

        });
    }

    // onAuth(client, options, req) {
    //     return true;
    // }

    onJoin (client: Client) {
        // client.send("hello", "world");
        console.log(client.sessionId, "joined!");
        this.state.players.set(client.sessionId, new Player());
    }

    onLeave (client) {
        console.log(client.sessionId, "left!");
        this.state.players.delete(client.sessionId);
    }

    onDispose () {
        console.log("Dispose StateHandlerRoom");
    }

}
