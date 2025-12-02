const form = document.querySelector('#itineraryForm');
const resultado = document.querySelector('#resultado');

// Reemplaza con tu Webhook URL de Make
const WEBHOOK_URL = 'TU_WEBHOOK_URL_DE_MAKE';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  resultado.textContent = 'Generando tu itinerario, por favor espera...';

  const data = {
    presupuesto: document.querySelector('#presupuesto').value,
    dias: document.querySelector('#dias').value,
    experiencia: document.querySelector('#experiencia').value,
    compania: document.querySelector('#compania').value,
    fechas: document.querySelector('#fechas').value,
    intereses: document.querySelector('#intereses').value.split(',').map(i => i.trim()),
    email: document.querySelector('#email').value
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    resultado.textContent = result.itinerario || 'No se pudo generar el itinerario. Verifica los datos.';
  } catch (error) {
    console.error(error);
    resultado.textContent = 'Error al conectar con PARACAS BOT. Intenta nuevamente.';
  }
});
