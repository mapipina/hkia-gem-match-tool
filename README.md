# 💎 HKIA Gem Match Tool

A Vue/Vite web app to track crystal colors for the Gem Match mini-game in Hello Kitty Island Adventure. 

## Features
* **Tracker:** 4x3 interactive grid to log gem colors.
* **Storage (V1):** Auto-saves board state to local browser storage.
* **Prediction (V2):** ~~(Planned)~~ Cloud DB integration to predict the next gem color based on past games.

## Local Development

Requires Node.js.

1. Clone repo
2. Enter directory: `cd hkia-gem-match-tool`
3. Install dependencies: `npm i`
4. Run locally: `npm run dev`

Open `http://localhost:5173` in your browser.

## Data Privacy
~~V1 uses `localStorage`. No data leaves your device.~~ V2 includes browser database and prediction logic. Data is still stored locally. 


## How the Predictor Works (And the "Magic Number")

This app does not use AI or machine learning. It uses **pure frequency analysis**. As you play and save winning boards, the app builds a local database. When you start a new game and log your first few crystals, the app filters your past winning games to find identical matches and calculates the probability of the remaining hidden colors.

### The "Magic Number" of Saved Games
Because the game uses a fixed set of 12 crystals (2 Red, 2 Yellow, 2 Sky Blue, 2 Purple, 4 Green), there are theoretically over **1.2 million** possible board combinations. 

To see the predictor actually become useful, **you need a minimum of 50 to 100 saved winning games**. 
* **1 - 49 games:** The predictor will likely guess incorrectly or show low confidence.
* **50+ games:** You will start seeing distinct probability shifts.
* **200+ games:** The algorithm will become highly effective at narrowing down the board after your first 3 or 4 clicks.


## Injecting Fake Data (Testing the UI)

If you want to see how the prediction UI works before you've played 50 real games, you can inject 50 mathematically valid, randomized games into your local database.

**How to inject seed data:**
1. Open `src/components/GemGrid.vue`.
2. Uncomment or add the `seedFakeData` function inside the `<script setup>` block.
3. Uncomment or add this button to your `<template>`:
   `<button class="reset-btn" @click="seedFakeData">Inject Fake Data</button>`
4. Save the file, click the button in your app once, and accept the alert.
5. **Important:** Delete the code and button from `GemGrid.vue` afterward so you don't accidentally pollute your database later.

**How to wipe the fake data later:**
When you are ready to start tracking real games, you must clear the fake data out of your browser:
1. Right-click the app in your browser and select **Inspect**.
2. Go to the **Application** tab (Chrome/Edge) or **Storage** tab (Firefox).
3. On the left sidebar, expand **IndexedDB** and click on `GemMatchDB`.
4. Click the **Delete database** button and refresh the page. You now have a clean slate!


## 💡 Pro-Tips for Local Usage

* **Browser Loyalty:** Because this app uses IndexedDB, your database lives entirely inside the specific browser you use. If you play on Chrome, your data will not be there if you open the app in Safari. Stick to one browser!
* **Mobile Companion:** If you are playing the game on your phone, keep this app open on your desktop/laptop as a companion screen.