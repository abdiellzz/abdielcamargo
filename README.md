# Portafolio — Abdiel Camargo

Sitio de una sola página para presentar tu perfil, tus proyectos y tus datos de contacto.
Hecho con HTML, CSS y JavaScript puros: sin frameworks, sin build, sin dependencias.

**Perfil que muestra la página:** Abdiel Camargo · Asistente de Sistemas en la Universidad
del Istmo · estudiante de Ciberseguridad · David, Chiriquí, Panamá.

**Contacto publicado:** `camargoabdiel015@gmail.com` · WhatsApp `+507 6786-2691` ·
[github.com/abdiellzz](https://github.com/abdiellzz) ·
[linkedin.com/in/camargoabdiel](https://www.linkedin.com/in/camargoabdiel/).

---

## Proyectos incluidos

| Proyecto | Repositorio | Contenido visual |
| --- | --- | --- |
| **FactionVault** | [`abdiellzz/academyy`](https://github.com/abdiellzz/academyy) | Logo pixel-art, 7 mundos, progreso y métricas (50 niveles · 29 simuladores · 42 CTF) |
| **IAMED** | [`abdiellzz/IAMED`](https://github.com/abdiellzz/IAMED) | Matriz de confusión, curvas ROC, CLI y tests reales + métricas (AUC 0.976 · 0.892 bal. · n = 624) |
| **ALLEN** | [`abdiellzz/allen`](https://github.com/abdiellzz/allen) | 3 capturas reales de la PWA móvil + métricas (6 cursos · v1.2.4 · 100 % local) |
| **APEX CRM** | [`Abdiellzzz/crm-divisual`](https://github.com/Abdiellzzz/crm-divisual) | Recreación del dashboard en CSS (el repo no trae capturas) |
| **Inventario UDI** | [`Abdiellzzz/proyecto_inventario_udi`](https://github.com/Abdiellzzz/proyecto_inventario_udi) | Tarjeta compacta al final de la sección |

Las capturas de IAMED y ALLEN se descargaron de los repositorios y viven en
`assets/img/iamed/` y `assets/img/allen/`. Todas abren en un visor con teclado
(← → Esc), deslizamiento táctil y contador.

---

## Ver la página en local

```bash
python3 -m http.server 5173
# Abre http://localhost:5173
```

También puedes abrir `index.html` haciendo doble clic.

## Estructura

```
index.html              Contenido (todos los textos están aquí)
assets/css/styles.css   Estilos, variables de color y responsive
assets/js/main.js       Menú, terminal, galería, visor y contacto
assets/img/iamed/       Figuras y capturas reales de IAMED
assets/img/allen/       Capturas móviles de ALLEN
assets/img/academyy/    Icono de FactionVault
```

---

## Cómo personalizarla

### 1. Correo y WhatsApp
Ya están configurados en `index.html` (sección **Contacto**) y en la constante `SITE`
de `assets/js/main.js` (solo se usa para el botón «Copiar correo»).

Si cambias el número, el formato del enlace es `https://wa.me/507XXXXXXXX` (sin `+`,
sin espacios ni guiones).

### 2. Tu foto
1. Guarda tu foto en `assets/img/perfil.jpg` (cuadrada, mínimo 400 × 400 px).
2. En `index.html`, busca el comentario `Para usar tu foto` (sección **Sobre mí**) y
   reemplaza el bloque `.avatar` por:

```html
<img class="avatar avatar--photo" src="assets/img/perfil.jpg" alt="Abdiel Camargo" width="82" height="82" />
```

### 3. Capturas de un proyecto
Cada imagen ampliable es un botón:

```html
<button class="shot" type="button"
        data-full="assets/img/iamed/mi-captura.png"
        data-caption="IAMED · Descripción que aparece en el visor.">
  <img src="assets/img/iamed/mi-captura.png" alt="Texto alternativo" width="1000" height="584" loading="lazy" decoding="async" />
  <span class="shot-tag">Etiqueta</span>
</button>
```

Guarda la imagen en `assets/img/`, copia el ancho y alto reales en los atributos
`width`/`height` y el visor la incluirá automáticamente en el recorrido.

### 4. Textos y métricas
Todo el contenido está en `index.html`. Para las cifras de cada proyecto usa la lista
`.metrics` (tres pares número + etiqueta).

### 5. Colores
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
2. **Settings → Pages** → *Deploy from a branch* → rama `main`, carpeta `/ (root)`.
3. Queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

### Netlify / Vercel
Arrastra la carpeta en Netlify Drop o importa el repositorio (build vacío,
directorio de publicación `/`).

### Dominio propio
Añade un archivo `CNAME` con tu dominio y configura los DNS según la guía de GitHub Pages.

---

## Notas

- Responsive (móvil, tablet y escritorio), con menú móvil y visor de capturas.
- Respeta `prefers-reduced-motion`; incluye navegación por teclado, enlace
  «Saltar al contenido», foco visible y textos alternativos en todas las imágenes.
- Sin cookies ni analítica. La única petición externa son las Google Fonts
  (puedes eliminarlas borrando el `<link>` y usando la fuente del sistema).
- Las cifras de IAMED están copiadas de las salidas reales del repositorio
  (bootstrap de 2 000 remuestras, test de McNemar y matriz de confusión).

### Pendientes sugeridos
- [ ] Subir tu foto de perfil
- [ ] Añadir capturas de FactionVault y APEX CRM cuando las tengas
- [ ] Enlazar el portafolio desde LinkedIn y GitHub
