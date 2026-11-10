# Tarifario Zayra Terrero 2026

Tarifario web de Zayra Terrero (influencer y UGC de skincare y cuidado capilar, San Isidro, República Dominicana). Reúne tarifas, licencias, canje, condiciones y contacto en una sola página para que las marcas cotizan y escriban por WhatsApp.

Es una página estática: HTML, CSS y un poco de JavaScript. No necesita instalación, compilación ni servidor, y funciona en GitHub Pages tal cual.

## Qué incluye
- Barra fija con anclas, botón "Cotizar" por WhatsApp y botón de modo claro/oscuro.
- Cifras de alcance de Instagram con contadores animados.
- Tarifas en tarjetas con interruptor **Emprendedor / Empresa** (con comprobante fiscal, ITBIS 18% incluido).
- Licencias, recargos, extras y canje de producto.
- Condiciones en acordeón y pasos para contratar.
- Botones de contacto (WhatsApp, correo, teléfono, Instagram) y "Descargar PDF" (usa la impresión del navegador).
- Respeta `prefers-reduced-motion` y el modo oscuro del sistema.

## Estructura
```
index.html   contenido (tarifas, licencias, canje, términos, contacto)
styles.css   colores y tipografías (variables al inicio, claro y oscuro)
script.js    interruptor de tarifas, tema, contadores, animaciones y PDF
img/         fotos en WebP, con respaldo JPG
fonts/       Cormorant Garamond y Jost (licencia OFL), sin depender de Google Fonts
```
Todas las rutas son relativas, así que funciona igual en `usuario.github.io/repo/` o en un dominio propio. Deben subirse todos los archivos y carpetas, sobre todo `script.js`: sin él la página se ve, pero el interruptor de precios, el modo oscuro y el PDF no funcionan.

## Subir con git (push)
Desde la carpeta del proyecto:
```bash
git init
git add .
git commit -m "Tarifario Zayra Terrero 2026"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git
git push -u origin main
```
Si el repositorio ya existe y tiene contenido, usa `git pull origin main --allow-unrelated-histories` antes del `push`. Para cambios posteriores basta con:
```bash
git add .
git commit -m "Describe el cambio"
git push
```

## Publicar con GitHub Pages
1. En el repositorio: Settings > Pages > Source: "Deploy from a branch" > Branch `main` / carpeta `/ (root)` > Save.
2. En 1 o 2 minutos queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
3. Para usar un dominio propio: en la misma pantalla, escribe el dominio en "Custom domain" y crea el registro DNS que GitHub indica.

### Después de publicar
- **Vista previa al compartir:** en el `<head>` de `index.html` hay un comentario. Agrega ahí la etiqueta con la URL absoluta de la foto, por ejemplo:
  `<meta property="og:image" content="https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/img/zayra-retrato.jpg">`
  Sin ella, al compartir el enlace por WhatsApp o Instagram no aparece la imagen.
- **Revisa en la URL publicada:** que carguen las fuentes y las fotos, que el interruptor Emprendedor/Empresa cambie los precios y que el botón de WhatsApp abra el chat.
- **Si no ves los cambios:** espera un par de minutos y recarga sin caché (Ctrl + F5). Pages tarda en actualizar.

## Editar contenido
- **Precios:** cada tarifa es una tarjeta `<article class="card">` en `index.html` con dos precios: `<span class="t-e">` (Emprendedor) y `<span class="t-b">` (Empresa). Al cambiar una tarifa base, actualiza también el precio de Empresa y el "por video" o "por Reel" de ambos (Empresa = base + 18% de ITBIS, redondeado a múltiplos de $5).
- **Licencias y extras:** son tablas en la sección `#licencias`.
- **Cifras de Instagram:** están en la sección `#alcance`. Cada número usa `data-to`, `data-prefix`, `data-suffix` y `data-dec` para el contador, y el texto visible dentro de la etiqueta debe coincidir. Cambia también la línea de fuente con las fechas.
- **WhatsApp:** el botón usa `https://wa.me/18298492470`. Para cambiar el número, reemplázalo en todos los enlaces `wa.me` de `index.html`, y también el `tel:` del pie.
- **Colores y tipografías:** variables `:root` al inicio de `styles.css` (hay un bloque para modo claro y otro para oscuro).
- **Fotos:** guarda el `.webp` y el `.jpg` con el mismo nombre en `img/`. Mantén los atributos `width` y `height` de las imágenes para evitar saltos de diseño.

## Vista previa local (opcional)
Abrir `index.html` con doble clic funciona. Si quieres probarlo como en Pages:
```bash
python -m http.server 8000
```
y abre `http://localhost:8000`.
