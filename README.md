# Claire Vlases Portfolio

A responsive React portfolio reimagined as a polished Windows 95 desktop.

## Direction

This version keeps the vintage Win95 aesthetic, but reframes it as a professional creative portfolio:
- editorial, not gimmicky
- playful, but recruiter-friendly
- responsive on mobile and desktop
- flexible for multiple audiences: design, PM, research, engineering, ethics, and art

## Current structure

- `src/App.jsx` — desktop shell, taskbar, window orchestration
- `src/components/` — reusable windows and desktop UI pieces
- `src/data/content.js` — editable portfolio copy and role-routing content
- `src/styles/global.css` — responsive Win95-inspired styling

## Next content to customize

Replace placeholders in `src/data/content.js`:
- real email / LinkedIn / GitHub links
- role-specific bullets and case study references
- obsession links and visuals
- portal copy for each audience

## Local development

Install dependencies and run:

```bash
npm install
npm run dev
```

## Recommended next phase

- swap emoji icons for custom pixel-art assets
- add real React95 components
- make windows draggable and layer-aware
- turn each portal into a full case-study world
- connect art, project, and research content from the old site
