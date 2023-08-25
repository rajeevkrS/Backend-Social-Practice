// This function is used for receiving the connection
module.exports.chatSockets = function(socketServer){
    // "io" is used for handling the connection
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: 'http://localhost:8000'
        }
    });

    // this recieves a connection then "connectionHandler()" will run and establishes the connection
    io.on('connection', function(socket){
        console.log('new connection recieved', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });


        socket.on('join_room', function(data){
            console.log('joining request recieved', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        // detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}





// Creating connection between the user and the server that is the "Observer" and the "Subscriber". 
// So, User will now subscribe to the observer.
// User initiate the connection always and then the observer detectes it and aknowledges it that the connection has be established.

// Step 1: In "home.ejs" file inside script tag which is "ChatEngine()" for creating a connection.
// Step 2: Creating a "class" which is going to send a request for connection in "js/chat_engine.js" file.
// Step 3: In "chat_sockets.js" file the function "chatSockets" is used for receiving the connection. 
    // Here the communication/interaction by socket takes place using "chatServer" will be done inside "chatSockets" function