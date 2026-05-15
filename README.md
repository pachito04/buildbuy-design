# BuildBuy — Design Preview

Repositorio standalone con **3 propuestas visuales × 3 secciones** del producto BuildBuy, navegables desde una sola URL.

**Live:** https://pachito04.github.io/buildbuy-design/

## Lo que hay adentro

### Variantes visuales

- **A · Industrial Brutalist** — swiss print × tactical, naranja como hazard red
- **B · High-End Soft** — Linear/Vercel core, doppelrand cards, Geist
- **C · Editorial Luxury** — cream cálido, serif itálico, vibe revista

### Secciones del producto

- **Landing pública** — hero · cómo funciona · roles · casos · FAQ · footer
- **Demo interactiva** — sidebar, perfil switcher, tour guiado, paywalls BB+
- **BB vs BB +** — comparativa de planes con tabla por categoría

## Stack

Vite · React 18 · TypeScript · Tailwind (mínimo) · Lucide. Sin Supabase, sin auth, sin react-router — proyecto descartable para iterar diseño.

## Desarrollo local

```sh
npm install
npm run dev
# abrir http://localhost:5173
```

## Deploy

GitHub Pages via Actions. Push a `main` → build automático → publicado en `https://pachito04.github.io/buildbuy-design/`.

## Status

**Propuesta — no producción.** Se usa para decidir dirección visual antes de bajar tokens al repo productivo [pachito04/buildbuy](https://github.com/pachito04/buildbuy).
