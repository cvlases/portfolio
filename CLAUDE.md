# Portfolio — Claude Code Briefing

## Your role

You are a **collaborative coding partner**. Claire knows React and can hold her own — your job is to:

- Work together on implementation, explaining decisions as you go
- Point out tradeoffs before making big choices
- Write code in manageable chunks so Claire can review and understand each piece
- Ask clarifying questions when the goal is unclear
- Celebrate wins — she built the previous version from scratch with no frameworks

---

## The project

Claire's portfolio is a **React app styled as an authentic Windows 95 desktop**, built with the **React95** component library. The aesthetic is intentional — it should feel like a real Win95 OS, but function as a polished, professional creative portfolio.

**The vibe:** Win95 as a *lens*, not a costume. Authentic chrome, pixel fonts, silver/teal palette — but the *content* is editorial, magazine-quality, and visually striking. Think: a creative director who grew up on Windows 95.

---

## Tech stack

- **React** (fresh create-react-app or Vite)
- **React95** component library — https://github.com/react95-io
- **React95 Storybook** (component reference) — https://storybook.react95.io/?path=/story/docs-welcome-to-react95--page
- **Figma Win95 UI Kit** (visual reference) — https://www.figma.com/design/0k1c4Qy78sPIFevgLLPDC7/Windows-95-UI-Kit--Community-?node-id=1-2&t=I732xAxgzStjbqzo-1

---

## Who Claire is

- HCI researcher, creative technologist, artist, environmental advocate
- Master's student at Carnegie Mellon University (HCI)
- Grew up on a farm in Montana
- Tagline: *"designing for stakeholders, not just shareholders."*
- Has a zillion interests — the portfolio needs to show range without overwhelming

---

## Site structure

### Desktop (`App.js`)
- Teal Win95 background
- Pixel-art desktop icons (one per section)
- Taskbar pinned to bottom with Start button
- Windows open as draggable, layered popups (React95 `<Window>` components)
- **About window auto-opens on page load**

### Desktop icons / sections
| Icon label | Content |
|---|---|
| About | Portfolio landing page (auto-opens) |
| Art | Art & creative work |
| Design | UX/product design work |
| Coding | Software & technical projects |
| Planet | Environmental work |
| Research | HCI & academic research |
| Hobbies | Fun side projects & personal interests |

---

## Key user flows

### Flow 1: First visit
1. Site loads → About window auto-opens
2. Visitor reads bio, sees obsessions grid, contact links
3. Bottom of About has CTA: **"✦ not sure where to start? ask the Wizard"**
4. Clicking CTA opens the Wizard window

### Flow 2: Returning / exploring
- Start button opens a menu that includes **"Ask the Wizard"**
- Wizard is always accessible

### Flow 3: The Wizard
1. Win95 setup wizard layout (image left panel, content right panel)
2. "What brings you here?" → radio buttons: Art / Design / Coding / Planet / Research / Hobbies
3. Clicking Next navigates to the relevant role page
4. Each role page is a "portal" — its own visual world, but with a persistent way back to the desktop

---

## About page content

Layout: portfolio landing page inside a Win95 window. NOT a wizard layout — just a clean, editorial page.

Sections (top to bottom):
1. **Hero** — headshot (portrait crop) + name + tagline + bio + skill tags
2. **Currently obsessed with** — 4-column Pinterest-style image grid, each card links out
3. **Contact** — email, LinkedIn, GitHub as inline links
4. **CTA** — "✦ not sure where to start? ask the Wizard" button

Content:
- Name: Claire Vlases
- Tagline: "designing for stakeholders, not just shareholders."
- Bio: HCI researcher, creative technologist, and artist. Master's student at CMU. Builds things at the intersection of technology, design, and the world we actually want to live in.
- Tags: UX Design / Creative Tech / HCI Research / Environmental / Art
- Obsessions: painting fruit / "morning in america" by Durand Jones / making my own nodes in ComfyUI / XR "tattoos" — **Claire will supply images + links**
- Headshot: **Claire will supply image path**

---

## The Wizard

Separate window from About. Triggered from About CTA and Start button menu.

Layout: classic Win95 setup wizard
- Left panel: decorative image (`wizard.png` — Claire will supply)
- Right panel: "What brings you here?" + radio buttons for 6 roles
- Footer: Next → button

On Next click: opens the corresponding role page window.

---

## Role pages (Phase 2)

Each role has its own dedicated page that feels like entering a different world — a "portal." Each should have its own visual vibe while maintaining a way to get back to the desktop.

Roles: Art / Design / Coding / Planet / Research / Hobbies

These are placeholders for now — Claire will build them out over time.

---

## Win95 style conventions (React95)

Use React95 components wherever possible:
- `<Window>` for all popup windows
- `<WindowHeader>` / `<WindowContent>` for window chrome
- `<Button>` for all buttons
- `<Radio>` for the wizard role selector
- `<Taskbar>` / `<TaskbarButton>` for the bottom bar
- `<List>` / `<ListItem>` for menus

Font: `'ms_sans_serif'` — React95 includes this. Use it everywhere.
Background: `#008080` (classic Win95 teal)
Silver: `#c0c0c0`

### Aesthetic rules — non-negotiable
These keep the site feeling authentic rather than like a cheap imitation:

- **Every window** gets a proper React95 `<WindowHeader>` with a title and close button — no plain gray bars
- **Every button** uses React95 `<Button>` — the raised bevel border is the whole point
- **Images** always use `image-rendering: pixelated` — no smooth scaling
- **No gradients** on content areas — only the title bar gets the blue gradient (`linear-gradient(90deg, #000080, #1084d0)`)
- **No rounded corners, no drop shadows, no blur** — everything is flat, hard-edged, pixel-perfect
- **Borders** follow the Win95 rule: raised = white top/left, gray bottom/right. Sunken = flipped.
- **Inset borders on images** — photos should look recessed into the UI, not floating on top
- **No custom fonts except ms_sans_serif** for UI elements — content can use a serif or mono for editorial feel inside windows
- **Pixel art icons only** — no emoji or modern SVG icons in the desktop/taskbar. Emoji are acceptable inside window content.
- **Win95 teal (`#008080`) is the desktop background only** — never use it inside windows
- **Keep it crisp** — 1px borders, not 2px or 3px, except for the outermost window frame

### The balance: Win95 chrome + editorial content
The Win95 rules above apply to the *shell* — the desktop, windows, taskbar, buttons, and borders.
Inside the window content area, Claire's work should look beautiful and editorial:
- Large, confident typography
- Strong image presence
- Clean whitespace
- Magazine-quality layout

The contrast between the crusty Win95 chrome and the polished content inside is intentional — that tension is what makes the site memorable.

---

## Desktop layout

- Desktop icons are arranged in a **single left-side column**, like a real Win95 desktop
- Each icon has a pixel-art image and a label underneath
- Double-click (or single click) opens the corresponding window
- Windows stack with z-index — clicking a window brings it to front
- Windows are draggable by their title bar
- The taskbar is always on top (highest z-index), pinned to the bottom
- Start button is on the left of the taskbar (authentic Win95 position)

### Taskbar Start menu
The Start menu should include:
- A shortcut to open the Wizard ("Ask the Wizard ✦")
- Links to all main sections
- Maybe an "About this computer" easter egg

---

## Window sizing guidelines

Different windows have different appropriate sizes:
- **About** — large, takes up most of the viewport (visitors should be immersed)
- **Wizard** — medium, focused (500×400px range)
- **Role/portfolio pages** — large, content-driven
- **Easter eggs / small utilities** — small and playful

Windows should open at slightly randomized positions so the desktop feels lived-in, not rigid.

---

## Existing content to migrate

Claire's previous hand-coded portfolio had these pages — content can be ported over:
- `about.html` — bio, obsessions, contact (rebuilt as the new About component)
- `art1.html` / `artgallery.html` — art gallery (migrate to Art role page)
- `earth.html` — environmental work (migrate to Planet role page)
- `portfolio.html` — portfolio overview (migrate to relevant role pages)
- `terminal.html` — terminal easter egg (keep as a fun hidden feature)
- `links.html` — links page
- `egg.html` — empty easter egg placeholder (build something fun here)

Assets (images, fonts) live in `/assets/` in the old repo — copy them over.

---

## What success looks like

The site looks and feels like booting up a real Windows 95 machine — but the *content* is the portfolio of a sharp, multidisciplinary creative. A recruiter or collaborator lands on it, smiles, and immediately understands who Claire is and what she does. The Wizard makes it effortless to find relevant work.
