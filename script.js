// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contactForm');
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const ageInput = document.querySelector('#age');
  const commentsInput = document.querySelector('#comments');
  const messageDiv = document.querySelector('#message');

  // Función para validar email (expresión regular sencilla)
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // evita recarga

    // Limpiar mensajes de error
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    messageDiv.textContent = '';

    let valid = true;

    // Validar nombre
    if (!nameInput.value.trim()) {
      document.querySelector('#nameError').textContent = 'El nombre es obligatorio.';
      valid = false;
    }

    // Validar email
    if (!emailInput.value.trim()) {
      document.querySelector('#emailError').textContent = 'El correo es obligatorio.';
      valid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      document.querySelector('#emailError').textContent = 'Formato de correo inválido.';
      valid = false;
    }

    // Validar edad (>17)
    const age = parseInt(ageInput.value, 10);
    if (!ageInput.value) {
      document.querySelector('#ageError').textContent = 'La edad es obligatoria.';
      valid = false;
    } else if (isNaN(age) || age <= 17) {
      document.querySelector('#ageError').textContent = 'Debes ser mayor de 17 años.';
      valid = false;
    }

    // Validar comentarios
    if (!commentsInput.value.trim()) {
      document.querySelector('#commentsError').textContent = 'Escribe tus comentarios.';
      valid = false;
    }

    if (!valid) return;

    // Crear mensaje de confirmación
    const welcomeMsg = document.createElement('p');
    welcomeMsg.textContent = `¡Gracias, ${nameInput.value.trim()}! Hemos recibido tu mensaje.`;
    messageDiv.appendChild(welcomeMsg);

    // (Opcional) Limpiar formulario
    form.reset();
  });

  // Ejemplo de evento de teclado: si presionas Enter en comentarios, cambias foco al botón
  commentsInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.querySelector('button[type="submit"]').focus();
    }
  });
});
