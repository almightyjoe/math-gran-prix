# Math Gran Prix Web

Browser-first fork of the local `pygame` version, intended as the design and logic base for a future Raspberry Pi hosted network edition.

## What This Branch Is

- Plain `HTML` / `CSS` / `JavaScript`
- No framework
- No build step
- No local background service required
- Usable directly in a browser as a design prototype

## What It Already Includes

- Responsive three-column game layout with separate setup, track, control, driver, prompt, and records panels
- Authored SVG track templates instead of a fake circular randomizer
- Mixed single-lane and dual-lane road sections to better match the spirit of the original board design
- Randomized hazard placement per race across authored candidate spaces:
  - `Spinner`
  - `Skipper`
  - `Sinker`
  - `Steps`
- Two to four total drivers
- Human and AI driver mix
- Driver initials
- Local scoring, placement bonuses, high-score tracking, and winner tracking
- Persistent records through a browser storage adapter using `localStorage`

## Test Locally

Open [index.html](C:\Users\jneal3\OneDrive - Schlumberger\Documents\pythons\CODEX\math-gran-prix-web\index.html) in a browser.

Because this version is static and dependency-free, it does not need `python`, `node`, or a local web server just to evaluate the design and gameplay flow.

## Later Raspberry Pi Hosting Plan

The intended next step is to keep this frontend mostly static and add a lightweight service behind it on the Pi. Recommended shape:

1. Serve this frontend as static files.
2. Add a tiny HTTP + WebSocket service for lobby, race state, and shared scoreboard.
3. Replace `localStorage` records with server-backed records.
4. Move AI and scoring validation server-side so remote clients cannot spoof results.

## Suggested Next Engineering Steps

1. Add deterministic shared race state serialization for remote play.
2. Replace the browser storage adapter with a shared server scoreboard API on the Raspberry Pi.
3. Add lane-aware car orientation and more polished authored art for hazards and track furniture.
4. Add a lobby screen and player-ready flow for actual network sessions.
