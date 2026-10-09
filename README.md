# Angular Theme Toggle

Demo mínima de un cambio de tema claro/oscuro en **Angular 21**, hecho con un servicio, un signal y variables CSS, sin librerías de UI.

## Cómo funciona

- [`ThemeService`](src/app/services/theme.service.ts) guarda el tema actual en un **signal** y lo aplica como atributo `data-theme` en `<html>`.
- [`styles.scss`](src/styles.scss) define los colores como **variables CSS** para cada valor de `data-theme`, así que los componentes no necesitan saber qué tema está activo.
- La elección se guarda en `localStorage`. La primera vez se usa el tema del sistema operativo (`prefers-color-scheme`).

## Stack

- Angular 21 (componentes standalone y signals)
- SCSS
- Vitest para los tests

## Cómo ejecutar

Requiere Node.js 20 o superior.

```bash
npm install
npm start
```

La aplicación queda en `http://localhost:4200`.

## Tests

```bash
npm test
```

Cubren el tema inicial (guardado, del sistema o por defecto), el cambio de tema y su persistencia.

## Build

```bash
npm run build
```
