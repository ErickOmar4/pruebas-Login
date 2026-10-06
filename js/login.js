/* login.js - validación del acceso (simulado, sin backend) */
document.addEventListener('DOMContentLoaded', () => {
  // Si ya hay sesión, entrar directo al sistema
  if (sessionStorage.getItem('sesion')) { location.replace('index.html'); return; }

  const form = document.getElementById('formLogin');
  const correo = document.getElementById('correo');
  const password = document.getElementById('password');
  const alerta = document.getElementById('alertaLogin');

  function marcar(input, ok, mensaje, idError) {
    input.classList.toggle('is-invalid', !ok);
    input.classList.toggle('is-valid', ok);
    document.getElementById(idError).textContent = ok ? '' : mensaje;
    return ok;
  }

  document.getElementById('verPassword').addEventListener('click', (e) => {
    const visible = password.type === 'text';
    password.type = visible ? 'password' : 'text';
    e.currentTarget.innerHTML = `<i class="bi bi-eye${visible ? '' : '-slash'}"></i>`;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alerta.classList.add('d-none');

    const correoOk = marcar(correo, validarCorreo(correo.value), 'Escribe un correo válido, por ejemplo nombre@correo.com.', 'errorCorreo');
    const passOk = marcar(password, validarPassword(password.value), 'Usa al menos 8 caracteres, con mayúscula, minúscula y número.', 'errorPassword');

    if (!correoOk || !passOk) {
      alerta.textContent = 'Revisa los campos marcados para continuar.';
      alerta.classList.remove('d-none');
      return;
    }

    // Sesión simulada: el nombre sale de la parte del correo antes de la @
    const mail = correo.value.trim();
    const nombre = mail.split('@')[0].replace(/[._-]+/g, ' ')
      .replace(/\b\p{L}/gu, (l) => l.toUpperCase());
    sessionStorage.setItem('sesion', JSON.stringify({ correo: mail, nombre }));
    location.href = 'index.html';
  });
});
