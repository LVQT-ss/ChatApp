'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null ;
var username= null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];




function connect(event){
    username = document.querySelector('#name').value.trim();
    if (username){
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SocketJS();
        stompClient = Stomp.over(socket);
        stompClient.connect({},onConnected,onError);
    }
    event.preventDefault()
}

function onConnected(){
//subsribe to the public topic
    stompClient.subscribe('/topic/public',onMessageReceived);

    //tell username to the server
    stompClient.send('/app/chat.addUser',
        {},
        JSON.stringify({sender:username,type:'JOIN'})
        )
    connectingElement.classList.add('hidden');

}
function onMessageReceived(){

}

usernameForm.addEventListener('submit', connect, true);