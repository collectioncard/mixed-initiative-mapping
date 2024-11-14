import '../style.css'
import {createGame} from "./phaser/exampleScene.js";

createGame('map');


document.querySelector('#llm-chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.querySelector('#llm-chat-input');
    let message = input.value.trim();
    if (message) {
        message = "User: " + message;
        const chatHistory = document.querySelector('#chat-history');
        const newMessage = document.createElement('li');
        newMessage.textContent = message;
        chatHistory.appendChild(newMessage);
        input.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
});