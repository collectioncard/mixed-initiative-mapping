import OpenAIApiHandler from "./OpenAIApiHandler.js";

const llm = new OpenAIApiHandler();

const chatBox = document.querySelector('#chat-history');

document.querySelector('#llm-chat-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const userInputField = document.querySelector('#llm-chat-input');
    const userMessage = userInputField.value.trim();
    if (!userMessage) return;
    userInputField.value = '';

    addChatMessage("User", userMessage);

    const botResponseEntry = addChatMessage("Bot", "");

    llm.getMessageCompletion(userMessage, botResponseEntry);
});

export function addChatMessage(sender, message) {
    const messageItem = document.createElement('li');
    messageItem.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messageItem.style.marginBottom = '10px';
    chatBox.appendChild(messageItem);
    return messageItem;
}

//Detect if something modified the chat box and scroll to the bottom
const observer = new MutationObserver(() => {
    chatBox.scrollTop = chatBox.scrollHeight;
});

observer.observe(chatBox, { childList: true, subtree: true, attributes: true, characterData: true });

//Don't allow the user to send messages while the bot is responding
document.addEventListener('responseStart', (event) => {
    document.querySelector('#llm-chat-input').disabled = true;
    document.querySelector('#llm-chat-submit').disabled = true;
    document.querySelector('#llm-chat-input').value = 'Thinking...';
});

document.addEventListener('responseEnd', (event) => {
    document.querySelector('#llm-chat-input').disabled = false;
    document.querySelector('#llm-chat-submit').disabled = false;
    document.querySelector('#llm-chat-input').value = '';
    document.querySelector('#llm-chat-input').focus();
});