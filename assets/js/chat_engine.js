// This class is going to send a request for connection
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // initiate the connection on Port 5000
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }

    }

    // "connectionHandler" will have to and fro interaction between the server/observer and subscriber that is the user.
    connectionHandler(){
        // first event : connect
        this.socket.on('connect', function(){
            console.log('connection established using sockets....!');
        });
    }
}

// We are sending the connect request and calling the "connectionHandler()" which detects if the connection established.