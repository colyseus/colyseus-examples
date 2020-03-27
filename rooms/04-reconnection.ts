import { Room, Client } from "colyseus";

export class ReconnectionRoom extends Room {
    onCreate (options: any) {
    }

    onJoin (client: Client, options: any, auth: any) {
        this.send(client, "Welcome!");
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

            const reconnectedClient = await this.allowReconnection(client, 60);
            console.log("Reconnected!");

            this.send(reconnectedClient, "Welcome back!");

        } catch (e) {
            console.log(e);

        }
    }

    onMessage (client: Client, data: any) {
    }

    onDispose () {
    }

}
