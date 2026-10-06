/* utileria.js - funciones de validación reutilizables (script clásico, sin módulos) */

function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(correo).trim());
}

// Mínimo 8 caracteres, con mayúscula, minúscula y número
function validarPassword(password) {
  const p = String(password);
  return p.length >= 8 && /[a-z]/.test(p) && /[A-Z]/.test(p) && /\d/.test(p);
}

function soloLetras(texto) {
  return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/.test(String(texto).trim());
}

// validarLongitud(valor, 6) => exactamente 6; validarLongitud(valor, 3, 20) => entre 3 y 20
function validarLongitud(valor, min, max = min) {
  const n = String(valor).length;
  return n >= min && n <= max;
}

// Recibe "AAAA-MM-DD" (valor de input type="date")
function calcularEdad(fechaNacimiento) {
  const [a, m, d] = String(fechaNacimiento).split('-').map(Number);
  if (!a || !m || !d) return NaN;
  const hoy = new Date();
  let edad = hoy.getFullYear() - a;
  if (hoy.getMonth() + 1 < m || (hoy.getMonth() + 1 === m && hoy.getDate() < d)) edad--;
  return edad;
}

function esMayorDeEdad(fechaNacimiento, mayoria = 18) {
  return calcularEdad(fechaNacimiento) >= mayoria;
}

function validarCodigoPostal(cp) {
  return /^\d{5}$/.test(String(cp).trim());
}

function contarCaracteres(texto) {
  return String(texto).length;
}
