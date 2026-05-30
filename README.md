# Math Gran Prix

Standalone static website version of Math Gran Prix.

## Website Shape

- Plain `HTML`, `CSS`, and `JavaScript`
- No framework
- No build step
- No backend service
- GitHub Pages compatible
- Results are kept only for the current browser session

## Included

- Local browser gameplay for two to four drivers
- Human and AI drivers
- Browser-side lobby flow with race codes, player roster, and ready checks
- Configuration changes reset player readiness before the race can start
- Addition, subtraction, multiplication, division, and mixed modes
- Eight selectable SVG race maps with distinct scenery
- Randomized hazard placement on the selected map
- Race view that prioritizes the map, move buttons, and active challenge
- Session-only final standings

## Run Locally

Open `index.html` in a browser, or serve the folder with any static file server.

## GitHub Pages

This project can be published directly from the repository root on the `main` branch. It does not need server storage unless shared all-time high scores, online multiplayer, or account features are added later.

The included GitHub Actions workflow deploys the static site to GitHub Pages after pushes to `main`.

## Remote Multiplayer

The lobby UI is ready for remote synchronization, but GitHub Pages cannot host the realtime service itself. True multi-location play needs a small backend or realtime data service to sync lobby membership, configuration, readiness, turns, and answers.

The current browser build keeps a local lobby registry in browser storage so create, join, posted race list, and ready/reset behavior can be exercised consistently before the realtime service is added.
