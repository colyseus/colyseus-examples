import { Room, Client } from "colyseus";

const FACEBOOK_APP_TOKEN = "135829507120512|3a97320bee18f2286d6243dcf4cc7a23";

export class AuthRoom extends Room {
    onCreate (options: any) {
        console.log("StateHandlerRoom created!", options);

        this.onMessage("*", (client, type, message) => {
            console.log("AuthRoom received message from", client.sessionId, ":", message);
        });
    }

    async onAuth (client: Client, options: any) {
        const response = await fetch(`https://graph.facebook.com/debug_token?input_token=${options.accessToken}&access_token=${FACEBOOK_APP_TOKEN}`, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => res.json());

        return (response as any).data;
    }

    onJoin (client: Client, options: any, auth: any) {
        console.log(client.sessionId, "joined successfully");
        console.log("Auth data: ", auth);
    }

    onLeave (client: Client) {
        console.log(client.sessionId, "left");
    }

    onDispose () {
        console.log("Dispose AuthRoom");
    }

}
