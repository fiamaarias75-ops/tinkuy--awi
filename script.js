const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const chatWindow = document.querySelector('#chat-window');

// Reemplaza con tu Webhook URL de Make
const WEBHOOK_URL = 'TU_WEBHOOK_URL_DE_MAKE';

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, 'user-message');
  chatInput.value = '';
  chatWindow.scrollTop = chatWindow.scrollHeight;

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const result = await response.json();
    const botMessage = result.reply || 'No hay respuesta del bot.';

    addMessage(botMessage, 'bot-message');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  } catch (error) {
    console.error(error);
    addMessage('Error al conectar con PARACAS BOT.', 'bot-message');
  }
});

function addMessage(text, className) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', className);
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
}
