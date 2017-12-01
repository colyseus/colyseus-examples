import { Room } from "colyseus";

export class BasicRoom extends Room {
    // this room supports only 4 clients connected
    maxClients = 4;

    onInit (options) {
        console.log("BasicRoom created!", options);

        this.setState({
            messages: []
        });
    }

    onJoin (client) {
        this.state.messages.push(`${ client.sessionId } joined.`);
    }

    onLeave (client) {
        this.state.messages.push(`${ client.sessionId } left.`);
    }

    onMessage (client, data) {
        this.state.messages.push(`(${ client.sessionId }) ${ data.message }`);
        console.log("BasicRoom received message from", client.sessionId, ":", data);
    }

    onDispose () {
        console.log("Dispose BasicRoom");
    }

}