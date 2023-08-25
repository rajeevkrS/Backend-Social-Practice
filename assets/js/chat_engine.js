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

        let self = this;

        // first event : connect
        this.socket.on('connect', function(){
            console.log('connection established using sockets....!');

            // once we are onnected then sending some data alongside
            // so whenever sending a request to join room, then sending which room to join (so which user I want to chat with).
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            });
        });

        // Send a message on clicking the send message button
        $('#send-message').click(function(){
            sendMessage();
        });
        
        // Send a message on keypress
        $('#chat-message-input').keypress(function(event){
            if (event.keyCode  === 13) { // Enter key
                sendMessage();
            }
        });

        function sendMessage() {
            // taking out the value of the input in text-box
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });

                // Clear the input field
                $('#chat-message-input').val('');
            }
        };

        //when receive message is received
        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);

            // then constructing a new li tag to show message
            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html': data.message
            }));

            newMessage.append($('<sub>',{
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}

// We are sending the connect request and calling the "connectionHandler()" which detects if the connection established.