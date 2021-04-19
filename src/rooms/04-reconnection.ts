import { Room, Client } from "colyseus";

export class ReconnectionRoom extends Room {
    onCreate (options: any) {
    }

    onJoin (client: Client, options: any, auth: any) {
        client.send("status", "Welcome!");
    }

    async onLeave (client: Client, consented?: boolean) {
        console.log(client.sessionId, "left", { consented });

        try {
            if (consented) {
                /*
                 * Optional:
                 * you may want to allow reconnection if the client manually closed the connection.
                 */
                throw new Error("left_manually");
            }

            await this.allowReconnection(client, 60);
            console.log("Reconnected!");

            client.send("status", "Welcome back!");

        } catch (e) {
            console.log(e);

        }
    }

    onDispose () {
    }

}
