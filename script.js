const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const chatWindow = document.querySelector('#chat-window');

// Webhook real
const WEBHOOK_URL = 'https://hook.us2.make.com/dcmpza5w9c9my3pp6xps8i7o8vnyelfq';

// Mantener hilo de conversación
let threadId = 'paracas_bot_thread';

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, 'user-message');
  chatInput.value = '';
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Mensaje temporal de "escribiendo..."
  const typingMessage = addMessage('PARACAS BOT está escribiendo...', 'bot-message temp-message');

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: "user", content: userMessage }],
        threadId: threadId
      })
    });

    const result = await response.json();
    const botMessage = result.reply || 'No hay respuesta del bot.';

    if (result.threadId) threadId = result.threadId;

    // Actualizar mensaje temporal con la respuesta real
    typingMessage.textContent = botMessage;
    typingMessage.classList.remove('temp-message');
    chatWindow.scrollTop = chatWindow.scrollHeight;

  } catch (error) {
    console.error(error);
    typingMessage.textContent = 'Error al conectar con PARACAS BOT.';
    typingMessage.classList.remove('temp-message');
  }
});

function addMessage(text, className) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', className);
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return msgDiv;
}
