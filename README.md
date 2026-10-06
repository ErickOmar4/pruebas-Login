# Sistema de acceso con login, sidebar y captura

Proyecto de dos pantallas conectadas, hecho con **HTML, CSS y JavaScript** y **Bootstrap 5.3.3** (sin React ni Vue). No requiere backend: el inicio de sesión se simula con JavaScript y `sessionStorage`.

## Flujo

1. `login.html`: formulario de correo y contraseña validados con `validarCorreo` y `validarPassword`. Si pasan, guarda la sesión y redirige a `index.html`.
2. `index.html`: sistema "dentro" con sidebar, navbar y formularios. Si se abre sin sesión, regresa a `login.html`.

## Funcionalidad de `index.html`

- **Sidebar** con botón hamburguesa (abre y cierra) y opción **Usuarios → Captura** (submenú desplegable).
- **Navbar** con el nombre del usuario a la derecha; al dar clic se despliega **Salir del sistema**, que cierra la sesión y vuelve a `login.html`.
- **Captura de usuarios**: nombre de usuario, correo (`validarCorreo`) y contraseña (`validarPassword`).
- **Formulario de alumnos**: nombre (`soloLetras`), número de control de 6 dígitos (`validarLongitud`) y fecha de nacimiento.
- **Modal de edad**: indica la edad y si el alumno es mayor o menor de edad (`calcularEdad`, `esMayorDeEdad`).

## Estructura

```
├── README.md
├── login.html
├── index.html
├── css/
│   └── login.css      # estilos de ambas pantallas
├── js/
│   ├── utileria.js    # librería de validaciones
│   ├── login.js       # lógica de login.html
│   └── index.js       # lógica de index.html
└── img/
    ├── logo.svg
    └── avatar.svg
```

## Cómo probarlo

Abre `login.html` en el navegador (o con Live Server en VS Code). Usa cualquier correo válido y una contraseña de al menos 8 caracteres con mayúscula, minúscula y número, por ejemplo `ana.lopez@correo.com` y `Clave1234`.

## Funciones de `utileria.js` usadas

`validarCorreo`, `validarPassword`, `soloLetras`, `validarLongitud`, `calcularEdad`, `esMayorDeEdad`.

## Publicar en GitHub

```bash
git init
git add .
git commit -m "Proyecto login e index"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

Crea el repositorio en GitHub como **público** antes de hacer el `push`.
