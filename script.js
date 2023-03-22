document.addEventListener('DOMContentLoaded', () => {
    const chatInputForm = document.querySelector('.chat-input');
    const chatMessages = document.querySelector('.chat-messages');
    const inputField = document.querySelector('.chat-input input');

    function appendMessage(content, className) {
        const message = document.createElement('div');
        message.textContent = content;
        message.classList.add('chat-message', className);
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatInputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = inputField.value.trim();
        if (message) {
            appendMessage(message, 'user-message');
            inputField.value = '';

            // Simulate an AI response after a short delay
            setTimeout(() => {
                // Replace this with the actual API call and response
                const aiResponse = `You said: ${message}`;
                appendMessage(aiResponse, 'ai-message');
            }, 1000);
        }
    });
});
