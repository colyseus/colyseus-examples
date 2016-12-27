var Room = require('colyseus').Room;

class ChatRoom extends Room {

  constructor ( options ) {
    super( options );
    this.setPatchRate( 1000 );
    this.setState({ messages: [] });
    console.log("ChatRoom created!", options);
  }

  onJoin (client) {
    this.state.messages.push(`${ client.id } joined.`);
  }

  onLeave (client) {
    this.state.messages.push(`${ client.id } left.`);
  }

  onMessage (client, data) {
    this.state.messages.push(data.message);
    console.log("ChatRoom:", client.id, data);
  }

  onDispose () {
    console.log("Dispose ChatRoom");
  }

}

module.exports = ChatRoom;
