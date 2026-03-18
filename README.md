# 💎 HKIA Gem Match Tool

A Vue/Vite web app to track crystal colors for the Gem Match mini-game in Hello Kitty Island Adventure. 

## Features
* **Tracker:** 4x3 interactive grid to log gem colors.
* **Storage (V1):** Auto-saves board state to local browser storage.
* **Prediction (V2):** (Planned) Cloud DB integration to predict the next gem color based on past games.

## Local Development

Requires Node.js.

1. Clone repo: `git clone https://github.com/yourusername/hkia-gem-match-tool.git`
2. Enter directory: `cd hkia-gem-match-tool`
3. Install dependencies: `npm install`
4. Run locally: `npm run dev`

Open `http://localhost:5173` in your browser.

## Data Privacy
V1 uses `localStorage`. No data leaves your device.