# notch-pal-web

The download site for [NotchPal](https://github.com/hexhad/notch-pal), a macOS notch companion for Claude Code.

Next.js (App Router) + Tailwind CSS, with:

- a live, scripted copy of the notch island (`src/components/NotchDemo.tsx`)
- a shader gradient hero backdrop ([shadergradient](https://github.com/ruucm/shadergradient), three.js / React Three Fiber)
- the hexagon in liquid metal ([paper-design/shaders](https://github.com/paper-design/shaders), as in liquid-logo)
- a liquid glass nav (`src/components/LiquidGlass.tsx`, after [liquid-glass-js](https://github.com/dashersw/liquid-glass-js))

## Develop

```bash
npm install
npm run dev
```

## Ship a new app version

1. Build the DMG in the app repo: `scripts/package.sh vX.Y.Z`
2. Copy `dist/NotchPal-X.Y.Z.dmg` into `public/downloads/` and delete the old one.
3. Update `release` in `src/lib/site.ts` (version, file, size, SHA-256 from `dist/SHA256SUMS.txt`).

## Deploy

Import the repo in Vercel. The defaults work: framework Next.js, build `next build`, no environment variables.
