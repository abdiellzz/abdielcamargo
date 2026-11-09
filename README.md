# Portafolio — Abdiel Camargo

Sitio de una sola página para presentar tu perfil profesional, tu stack y tus proyectos.
Hecho con HTML, CSS y JavaScript puros: sin frameworks, sin build, sin dependencias.

**Perfil que muestra la página:** Abdiel Camargo · Asistente de Sistemas en la Universidad
del Istmo · Estudiante de Ciberseguridad · David, Chiriquí, Panamá.

---

## Ver la página en local

```bash
# Desde la carpeta del proyecto
python3 -m http.server 5173
# Abre http://localhost:5173
```

También puedes abrir `index.html` haciendo doble clic.

## Estructura

```
index.html              Contenido (todos los textos están aquí)
assets/css/styles.css   Estilos, variables de color y responsive
assets/js/main.js       Menú, animaciones, terminal y datos de contacto
assets/img/             Aquí van tus fotos
```

---

## Cómo personalizarla

### 1. Tu correo y WhatsApp
Abre `assets/js/main.js` y completa:

```js
const SITE = {
  email: 'tu-correo@dominio.com',
  whatsapp: '50761234567'   // sin +, sin espacios, sin guiones
};
```

Si los dejas vacíos, esos botones se ocultan solos (la página nunca muestra datos falsos).

### 2. Tu foto
1. Guarda tu foto en `assets/img/perfil.jpg` (cuadrada, mínimo 400 × 400 px).
2. En `index.html`, busca el comentario `Para usar tu foto` (sección **Sobre mí**) y
   reemplaza el bloque `.avatar` por:

```html
<img class="avatar avatar--photo" src="assets/img/perfil.jpg" alt="Abdiel Camargo" width="82" height="82" />
```

### 3. Textos y proyectos
Todo el contenido está escrito en `index.html`. Los bloques principales:

| Sección | Qué editar |
| --- | --- |
| Hero | Nombre, rol, descripción y botones |
| Sobre mí | Bio, datos y mini estadísticas |
| Stack | Tarjetas de tecnologías (añade o quita `<li>` en `.tags`) |
| Proyectos | Dos casos completos + tarjeta de "próximo proyecto" |
| Trayectoria | Línea de tiempo y valores de trabajo |
| Contacto | Enlaces a LinkedIn, GitHub e Instagram |

Para añadir un proyecto, copia un bloque `<article class="project">…</article>` completo
y cambia el título, la descripción, las etiquetas y el enlace de GitHub.

### 4. Colores
En `assets/css/styles.css`, al inicio:

```css
:root {
  --acc: #5eead4;    /* acento principal (turquesa) */
  --acc-2: #818cf8;  /* acento secundario (índigo) */
  --bg: #05060a;     /* fondo */
}
```

---

## Publicarla gratis

### GitHub Pages
1. Sube el proyecto a un repositorio público.
2. Ve a **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. La página queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

> Si publicas en un subdirectorio, verifica que las rutas relativas (`assets/...`)
> funcionen; al estar todas sin `/` inicial, funcionan igual en raíz o en subcarpeta.

### Netlify / Vercel
Arrastra la carpeta del proyecto en Netlify Drop, o importa el repositorio
(deja el comando de build vacío y el directorio de publicación en `/`).

### Dominio propio
Añade un archivo `CNAME` con tu dominio y configura los DNS según la guía de GitHub Pages.

---

## Notas

- Todo el sitio es responsive (móvil, tablet y escritorio).
- Respeta `prefers-reduced-motion` para personas sensibles al movimiento.
- Incluye navegación por teclado, enlace "Saltar al contenido" y textos alternativos.
- Sin cookies, sin analítica, sin dependencias externas salvo Google Fonts
  (si quieres cero peticiones externas, borra el `<link>` de fuentes y usa la fuente del sistema).

### Pendientes sugeridos
- [ ] Añadir correo y WhatsApp en `main.js`
- [ ] Subir foto de perfil
- [ ] Añadir capturas reales de APEX CRM e Inventario UDI
- [ ] Enlazar este portafolio desde tu LinkedIn y GitHub
