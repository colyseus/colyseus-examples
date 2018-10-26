import { Room } from "colyseus";

export class CreateOrJoinRoom extends Room<any> {
    maxClients = 4;

    onInit (options) {
        console.log("CREATING NEW ROOM");
    }

    onJoin (client, options, auth) {
        console.log("JOINING ROOM");
    }

    requestJoin (options, isNewRoom: boolean) {
        return (options.create)
            ? (options.create && isNewRoom)
            : this.clients.length > 0;
    }

    onMessage (client, message: any) {

    }

    onLeave (client) {
        console.log("ChatRoom:", client.sessionId, "left!");
    }

}
