/* index.js - lógica del sistema (sidebar, navbar, formularios y modal) */
document.addEventListener('DOMContentLoaded', () => {
  const sesion = JSON.parse(sessionStorage.getItem('sesion') || 'null');
  if (!sesion) return; // el guard del <head> ya redirige a login.html

  const $ = (id) => document.getElementById(id);
  const usuarios = [];
  const alumnos = [];

  /* ---------- Navbar ---------- */
  $('nombreUsuario').textContent = sesion.nombre || sesion.correo;
  $('saludoNombre').textContent = sesion.nombre || sesion.correo;
  $('correoUsuario').textContent = sesion.correo;
  $('btnSalir').addEventListener('click', () => {
    sessionStorage.removeItem('sesion');
    location.href = 'login.html';
  });

  /* ---------- Sidebar ---------- */
  const esMovil = () => matchMedia('(max-width: 991.98px)').matches;
  $('btnMenu').addEventListener('click', () => {
    document.body.classList.toggle(esMovil() ? 'menu-abierto' : 'menu-cerrado');
  });
  $('fondoMenu').addEventListener('click', () => document.body.classList.remove('menu-abierto'));

  document.querySelectorAll('[data-vista]').forEach((enlace) => {
    enlace.addEventListener('click', (e) => {
      e.preventDefault();
      ['vistaInicio', 'vistaCaptura'].forEach((v) => $(v).classList.toggle('d-none', v !== enlace.dataset.vista));
      document.querySelectorAll('[data-vista]').forEach((a) => a.classList.toggle('activo', a === enlace));
      document.body.classList.remove('menu-abierto');
    });
  });

  /* ---------- Utilidades de validación visual ---------- */
  function marcar(input, ok, mensaje) {
    input.classList.toggle('is-invalid', !ok);
    input.classList.toggle('is-valid', ok);
    input.nextElementSibling.textContent = ok ? '' : mensaje;
    return ok;
  }
  function limpiar(form) {
    form.reset();
    form.querySelectorAll('.is-valid, .is-invalid').forEach((i) => i.classList.remove('is-valid', 'is-invalid'));
  }
  function filaVacia(tbody, columnas, texto) {
    tbody.innerHTML = '';
    const tr = tbody.insertRow();
    const td = tr.insertCell();
    td.colSpan = columnas; td.className = 'text-secondary'; td.textContent = texto;
  }
  function agregarFila(tbody, valores, primera) {
    if (primera) tbody.innerHTML = '';
    const tr = tbody.insertRow();
    valores.forEach((v) => { tr.insertCell().textContent = v; }); // textContent evita inyectar HTML
  }
  function actualizarTotales() {
    $('totUsuarios').textContent = usuarios.length;
    $('totAlumnos').textContent = alumnos.length;
  }

  /* ---------- Formulario de usuarios ---------- */
  $('formUsuario').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = $('usuNombre'), correo = $('usuCorreo'), pass = $('usuPassword');

    const okNombre = marcar(nombre, validarLongitud(nombre.value.trim(), 3, 20), 'El nombre de usuario debe tener entre 3 y 20 caracteres.');
    const okCorreo = marcar(correo, validarCorreo(correo.value), 'Escribe un correo válido, por ejemplo nombre@correo.com.');
    const okPass = marcar(pass, validarPassword(pass.value), 'Usa al menos 8 caracteres, con mayúscula, minúscula y número.');
    if (!(okNombre && okCorreo && okPass)) return;

    usuarios.push({ nombre: nombre.value.trim(), correo: correo.value.trim() });
    agregarFila($('tablaUsuarios'), [nombre.value.trim(), correo.value.trim()], usuarios.length === 1);
    actualizarTotales();
    limpiar(e.target);
  });

  /* ---------- Formulario de alumnos ---------- */
  $('aluControl').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });
  $('aluNacimiento').max = new Date().toISOString().split('T')[0];

  $('formAlumno').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = $('aluNombre'), control = $('aluControl'), nac = $('aluNacimiento');

    const okNombre = marcar(nombre, soloLetras(nombre.value), 'Escribe el nombre solo con letras.');
    const okControl = marcar(control, validarLongitud(control.value, 6) && /^\d+$/.test(control.value), 'El número de control debe tener exactamente 6 dígitos.');
    const okNac = marcar(nac, nac.value !== '' && calcularEdad(nac.value) >= 0, 'Elige una fecha de nacimiento válida.');
    if (!(okNombre && okControl && okNac)) return;

    if (alumnos.some((a) => a.control === control.value)) {
      marcar(control, false, 'Ese número de control ya está registrado.');
      return;
    }

    const edad = calcularEdad(nac.value);
    const mayor = esMayorDeEdad(nac.value);
    alumnos.push({ control: control.value, nombre: nombre.value.trim(), edad });
    agregarFila($('tablaAlumnos'), [control.value, nombre.value.trim(), edad], alumnos.length === 1);
    actualizarTotales();

    // Modal de edad
    const cuerpo = $('modalEdadCuerpo');
    cuerpo.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'mb-2';
    p.textContent = `${nombre.value.trim()} tiene ${edad} años.`;
    const aviso = document.createElement('div');
    aviso.className = `alert ${mayor ? 'alert-success' : 'alert-warning'} mb-0`;
    aviso.textContent = mayor ? 'Es mayor de edad.' : 'Es menor de edad.';
    cuerpo.append(p, aviso);
    bootstrap.Modal.getOrCreateInstance($('modalEdad')).show();

    limpiar(e.target);
  });
});
