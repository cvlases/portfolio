# Portfolio Build — Claude Code Master Brief


---

## Site structure

A hand-coded **Windows 95-style desktop portfolio**. The visitor lands on a teal desktop with pixel-art icons and a start bar. Each icon opens a popup window containing a content page. The aesthetic is intentional and should be preserved throughout: pixel font (PX Sans), silver Win95 bevel borders, teal background, crisp pixelated image rendering.


---

## Full project directory

### 🎨 Art page (gallery only)
These live on the Art gallery page. Visual presentation, minimal text, tagged by medium.

| Project | Medium tag |
|---|---|
| Wildflowers of Montana (published book) | illustration |
| Snowstock t-shirt and poster designs | graphic design |
| Bike shop merch (Scripps, USCGA, UC Bike) | graphic design |
| Botanical illustration — ongoing, Phipps Conservatory | watercolor / illustration |
| Montana video | video |
| "Core core" video | video |
| Travel photography | photography |

---

### ✏️ Design (portfolio project pages)
| Project | Notes |
|---|---|
| **Meridian** | AIXD final project |
| **Bumble Wing** | AI coaching feature for Bumble, design challenge |
| **LoDown / LocalLens** | browser extension surfacing local journalism |
| **GoLocal** | website redesign |
| **UI for AI Lab** | research lab UX work |
| **Clorb** | gamified chore app — *also* won UX design hackathon (full-stack too, see Build) |

---

### 💻 Build (portfolio project pages)
| Project | Notes |
|---|---|
| **Newspeak Dictionary** | web experience, AI + language, Gemma-2-2B feature steering, vintage-glitch aesthetic |
| **WebGL river experience** | three-phase interactive build, AI speaks as the river |
| **Three.js botanical fairy meadow** | cel-shading, custom OBJ flowers |
| **ComfyUI custom node package** | saliency/XAI node, deployed to RunComfy, beginner tutorial docs |
| **Pittsburgh / Mon Valley pollution analysis** | GeoTIFF dispersion modeling, SmellPGH cross-reference, Jupyter |
| **Montana cybersecurity** | XSOAR response playbook automation for State of Montana |

---

### 🔬 Research (portfolio project pages)
| Project | Notes |
|---|---|
| **Ink & Interface** | MHCI capstone with Arm — on-skin XR interaction, tattoo convention fieldwork, 18 design principles, Wizard-of-Oz study |
| **GenAIxRad** | multi-agent XAI in clinical CT viewer, IJCAI 2026, co-authored with Katelyn Morrison |
| **MuMMI (LLNL)** | molecular dynamics cancer research, Lawrence Livermore |
| **Dual graph theory redistricting** | won best poster AND best presentation at SOCAMS conference |

---

### 🌱 Ethics & Philosophy (portfolio project pages)
| Project | Notes |
|---|---|
| Philosophy of love paper | |
| Philosophy of language paper | |
| Medium articles | |
| AI safety / ethics — State of Montana | |

---

### ⭐ Play (lighter treatment — could be a single page or section) Rename play to (Worth) Whiles
Skiing, gardening, teaching people to code, being in nature

---

### 🌿 Planet (own standalone section)
The climate lawsuit story and its aftermath. Treat this as a narrative, not a project card.

| Item | |
|---|---|
| Held v. Montana — the climate lawsuit | flagship story |
| TIME Earth Award — December 2023 | |
| Speaking at the UN — February 2024 | |
| ACLU interview, CNN interview, NZ Public Radio | media coverage |
| Bozeman Climate Council — finished 2020 | |
| Generation 180 solar panels — middle school project | |
| Pittsburgh/Mon Valley pollution analysis | (cross-listed from Build) |

---

### Recognitions (go in About page — not front and center)
Coke Scholar, Rales Fellow, TIME Earth Awardee. Small and tasteful — a quiet line or logo row near the bottom of the about page. Not a brag shelf.

---

## Project page structure

Every project page shares a **loose skeleton**. The content inside each section flexes to serve the project's actual story.

### The metadata strip (top of every page)
Quick-scan info, not paragraphs. A compact header row or sidebar:
- **Role** — e.g. "Lead researcher", "Sole developer", "UX designer"
- **Tools** — e.g. "Figma, Python, Three.js"
- **Time** — e.g. "Jan–May 2025"
- **Team** — e.g. "Solo" or "4-person team"

### The content sections (in order)
1. **Hook** — 1–2 sentences. Not a description — an interesting angle. What makes this project worth reading about?
2. **The problem** — what was broken, missing, or worth exploring? Why did it matter?
3. **The process** — the actual story. Decisions made, things that didn't work, pivots, insights. Not a task list.
4. **The artifacts** — images, videos, sketches, diagrams, prototypes, code snippets. **LOTS of these.**
5. **What I learned / what I'd do differently** — one paragraph, shows maturity
6. **Links** — demo, GitHub, paper, press, video

### Images and video
Every project page should be **visually dense**. Reviewers slow down for images. For every section of the process, ask: what is there to *show* here? Process photos, sketches, wireframes, screenshots, screen recordings, conference photos, research artifacts. If it exists, show it.

---

## Design process tracker — Design projects only

For design-heavy project pages (Meridian, Bumble Wing, LoDown/LocalLens, GoLocal, UI for AI Lab, Clorb, Ink & Interface), use a **sticky scroll-spy header** at the top of the page that tracks progress through the design process as the visitor scrolls.

The stages, in order:
```
UNDERSTAND → DEFINE → DESIGN → DEVELOP → VALIDATE → PROMOTE → EXHIBIT
```

### How it should work
- The header sticks to the top of the popup window content area as the user scrolls
- Each stage corresponds to a named section in the page (use `id` attributes)
- As the visitor scrolls into each section, that stage label becomes **highlighted/active**
- Clicking a stage label jumps to that section (anchor link behavior)
- Inactive stages are dimmed; the active one is bright

### Win95 aesthetic for this component
Style it like a Win95 tab bar or toolbar — silver background, the active stage looks like a depressed/selected tab, inactive ones look like raised buttons. Fits the OS metaphor: you're navigating through "panels" of the project.

### Not every stage is required for every project
Some projects won't have a PROMOTE or EXHIBIT stage. If a stage doesn't apply, omit it — don't leave it in as a placeholder. The tracker only shows stages that have content.

---

