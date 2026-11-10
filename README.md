# Tarifario Zayra Terrero

Página estática (HTML + CSS). No necesita instalación ni compilación.

## Publicar con GitHub Pages
1. Crea un repositorio nuevo en GitHub y sube todo el contenido de esta carpeta a la rama `main`.
2. En el repositorio: Settings > Pages > Source: "Deploy from a branch" > Branch: `main` / carpeta `/ (root)` > Save.
3. En un par de minutos queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
4. Para usar un dominio propio: en la misma pantalla, escribe el dominio en "Custom domain" y crea el registro DNS que GitHub indica.

## Estructura
- `index.html`: contenido (tarifas, licencias, canje, términos, contacto).
- `styles.css`: colores y tipografías (variables al inicio, modo claro y oscuro).
- `img/`: fotos.
- `fonts/`: Cormorant Garamond y Jost (licencia OFL).

## Editar precios
Los precios están en `index.html`, dentro de las tablas. Al cambiar una tarifa base, actualiza también la columna "Empresa" (base + 18% de ITBIS, redondeado a múltiplos de $5).
