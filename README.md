# Discover-the-Wonder-of-Sri-Lanka

Vite + React + TypeScript site about traveling in Sri Lanka.

## Getting started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev` or `npx vite`
3. Production build: `npm run build` (output in `dist/`)
4. Preview build: `npm run preview`

Images are served from `public/` and referenced via `import.meta.env.BASE_URL`.

## Live weather

Create a `.env` file (not committed) with:

```env
VITE_OPENWEATHER_API_KEY=your_key_here
```

On Netlify, add the same variable under **Site configuration → Environment variables**.

## Deploy (Netlify)

- **Build command:** `npm run build`
- **Publish directory:** `dist`

Settings are mirrored in `netlify.toml`.
