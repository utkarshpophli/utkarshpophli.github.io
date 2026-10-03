# Hyperframes Composition Brief: GLOW

## Objective
Create a short launch-style brag video for GLOW.

## Output
- Composition directory: `brag-output/glow/composition/`
- Rendered video: `brag-output/glow/brag.mp4`
- Format: landscape, 1920x1080, 30fps
- Duration: 21.28s

## Source Material
- Project root: https://github.com/utkarshpophli/GLOW (read via the GitHub API; not run locally)
- Primary files read: `README.md`, `body/glow_orb.py`, repository tree
- Product name: GLOW (General Local Offline Windows-agent)
- Tagline / strongest claim: "an autonomous AI assistant that can see, understand, and control your Windows PC"; 92 tools; Planner, Executor, Verifier
- Key UI or visual moment to recreate: the glowing orb and light input bar; the README's four-step vision example
- Copy that must appear verbatim:
  - Look at my screen, analyze this chart, and save a summary to report.txt
  - General Local Offline Windows-agent
  - Takes screenshot with Gemini Vision
  - Analyzes chart data and trends
  - Summarizes key findings with AI
  - Creates file with actual analysis (not placeholders!)
  - Comprehensive Windows automation
  - Planner, Executor, Verifier
  - Category counts: File & OS 15, Browser 8, Office 12, AI-Powered 13, Vision 7, System 14, Dev Tools 13, Input 10 (total 92)

## Creative Direction
- Tone preset: cinematic
- Creative direction: a quiet sci-fi assistant waking up
- Angle: one sentence in, a finished file out
- Hook: orb breathes, the prompt types itself
- Outro / punchline: "Vision-first. Fully autonomous." then the repo URL
- Avoid: generic SaaS language, abstract filler, fake claims about local/offline processing (the project also uses cloud models)

## Visual Identity
- Background #070B14 to #0B1426; Accent #4A90E2, highlight #68AEFF, green #51CF66, red #E74C3C; Text #F8F9FA
- Fonts: Segoe UI, Consolas for filenames

## Audio
- Music: `assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`, volume 0.30, fade out last 1.4s
- Music cue guidance: bundled preset; strong cues 4.39, 13.11, 17.47; chip beats 13.11 to 16.93
- Audio-reactive: subtle orb glow from `assets/rms.js` (pre-extracted loudness, 30 values per second)
- SFX: one pre-mixed track `assets/sfx-mix.wav` built from the CC0 Kenney and keyboard sets by `_tools/mix_sfx.py`

## Hyperframes Instructions
Build with the Hyperframes CLI conventions (paused GSAP timeline on `window.__timelines`, `data-start`/`data-duration`, local assets only, deterministic logic). Run `hyperframes check` before render.
