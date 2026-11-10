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
script.js    menú móvil, interruptor de tarifas, tema, contadores, volver arriba y PDF
theme-init.js  aplica el tema guardado antes de pintar (evita parpadeo)
LICENSE      derechos reservados
.github/CODEOWNERS  quién debe aprobar cambios (ver Seguridad)
img/         fotos en WebP con respaldo JPG, e og-zayra.jpg (vista previa al compartir)
fonts/       Cormorant Garamond y Jost (licencia OFL), sin depender de Google Fonts
```
Todas las rutas son relativas, así que funciona igual en `usuario.github.io/repo/` o en un dominio propio. Deben subirse todos los archivos y carpetas, sobre todo `script.js`: sin él la página se ve, pero el interruptor de precios, el modo oscuro y el PDF no funcionan.

### Después de publicar
- **Sitio oficial:** https://zayravttavarez-cpu.github.io/tarifario-influencer/
- **Vista previa al compartir:** ya está configurada (`og:image`, `og:url`, `twitter:card`) con la imagen `img/og-zayra.jpg` (1200×630).