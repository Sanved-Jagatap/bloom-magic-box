# BLOOM + MAGIC BOX 🌷

A tiny, cheerful website made to brighten someone's day. It is a single static page: no login, no backend, no database, no API key, no build step, and nothing to install to use it. It stores nothing in the browser and plays no audio.

> This is an entertainment and comfort experience. It makes no medical claims and is not a treatment for anything.

## 1. Features
- Welcome screen with an animated flower and two actions (Let's explore / Surprise me).
- BLOOM home with 6 mood cards: Make me laugh, I need comfort, Entertain my brain, Let me play, Show me something cute, Surprise me.
- 4 "Open when…" envelopes.
- Interactive garden: tappable flowers with messages, a butterfly that flies away when tapped, and a hidden gift that opens the Magic Box.
- Play corner: recolorable flower and a bubble-popping game.
- Magic Box: animated gift box, 7 chip filters (Wildcard, Funny, Sweet, Interesting, Riddle, Cute, Challenge), 53 surprises plus 3 rare ones, shuffled so nothing repeats until a category is used up, and no back-to-back repeats.
- Riddles hide the answer until you tap Reveal.
- Bottom navigation (Home, Bloom, Magic Box), mobile-first layout, touch-friendly controls, keyboard accessible, `prefers-reduced-motion` respected, automatic dark mode.

## 2. Directory structure
```
bloom-magic-box/
├── index.html            ← the whole app (HTML + CSS + JS + content in one file)
├── README.md
├── .gitignore
├── package.json          ← optional: only for `npm start` / `npm test`
└── tests/
    └── smoke-test.js     ← optional automated check (simulated browser)
```
The app was kept as one self-contained file on purpose. There are no images, fonts, icons or external scripts; all visuals are inline SVG, CSS and emoji. Emoji look slightly different on each device, which is normal.

## 3. Prerequisites
Only a modern browser (Chrome, Edge, Firefox, Safari). Everything else below is optional:
- **Python 3** (for the simplest local server) from https://www.python.org/downloads/ (tick "Add python.exe to PATH").
- **Node.js LTS** (only for `npm start` / `npm test`) from https://nodejs.org
- **Git** (only for GitHub) from https://git-scm.com/download/win

## 4. Windows setup
1. Right-click the ZIP → **Extract All…** and choose a folder, e.g. `C:\Projects\bloom-magic-box`. (Do not run it from inside the ZIP.)
2. Make sure `index.html` is directly inside the extracted folder you open in the next step.

## 5. Run it locally
**Easiest:** double-click `index.html`. It works directly from disk.

**With a local server (recommended, closer to the real website):** open PowerShell in the project folder (File Explorer → click the address bar → type `powershell` → Enter), then use one option:

```powershell
py -m http.server 8000
```
or, if you have Node.js:
```powershell
npm start
```
Open **http://localhost:8000** in your browser.

If `py` is not recognized, try `python -m http.server 8000`.

## 6. Stop the server
Click the PowerShell window and press **Ctrl + C**. Close the window.

## 7. Test responsiveness in Chrome DevTools
1. Open http://localhost:8000 in Chrome.
2. Press **F12** (or Ctrl+Shift+I), then **Ctrl+Shift+M** for device mode.
3. Choose "Responsive" and try widths **320, 360, 390, 430, 768, 1366, 1440**.
4. Check: no sideways scrolling, buttons easy to tap, bottom bar visible, text readable.
5. Reduced motion: DevTools → ⋮ → More tools → **Rendering** → "Emulate CSS media feature prefers-reduced-motion: reduce". Petals should disappear and the box should open instantly.

## 8. Test on a real phone
**Same Wi-Fi:** start the server with `py -m http.server 8000`. Find your PC's IP with `ipconfig` (look for "IPv4 Address", e.g. `192.168.1.23`). On the phone's browser open `http://192.168.1.23:8000`. If it doesn't load, allow Python through Windows Firewall when prompted (private networks).

**Simplest of all:** deploy it (section 11) and open the live link on the phone.

## 9. Edit the content
Open `index.html` in any text editor (VS Code or Notepad). Search for **`CONTENT (edit anything here)`**. Everything editable is inside the `const C = { ... }` block:

| What | Where in `C` |
|---|---|
| Welcome title, message, button labels | `welcome` |
| Mood cards | `moods` |
| "Open when…" envelopes | `envelopes` (`l` = label, `t` = message) |
| Garden flower messages | `garden` |
| Rare surprises | `rare` |
| Jokes / announcements | `items.funny` |
| Sweet notes | `items.sweet` |
| Facts | `items.fact` |
| Riddles | `items.riddle` as `["question","answer"]` |
| Cute characters | `items.cute` as `["emoji","caption"]` |
| Mini challenges | `items.challenge` |

Add a new item by adding a comma-separated line to the right list, e.g. `"My new joke 😄",`. Keep the quotes and the comma. Reload the page to see it. Keep the quote style the file uses (straight `"` around the text); if your text contains a straight `"`, write `\"`.

## 10. Create a GitHub repository and push
1. Create a free account at https://github.com and click **New repository**. Name it `bloom-magic-box`, keep it **Public** (needed for free GitHub Pages), and do **not** add a README (you already have one).
2. In PowerShell, inside the project folder:
```powershell
git init
git add .
git commit -m "Initial commit: Bloom + Magic Box"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/bloom-magic-box.git
git push -u origin main
```
Replace `YOUR-USERNAME`. GitHub will ask you to sign in the first time.

## 11. Deploy
### Option A: GitHub Pages (free)
1. On the repo page: **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Wait 1 to 2 minutes. Your link will be `https://YOUR-USERNAME.github.io/bloom-magic-box/`.

### Option B: Vercel (free)
1. Sign in at https://vercel.com with GitHub.
2. **Add New… → Project** → import `bloom-magic-box`.
3. Framework preset: **Other**. Leave Build Command and Output Directory empty. Click **Deploy**.
4. You get a link like `https://bloom-magic-box.vercel.app`.

To update after edits: `git add . && git commit -m "Update" && git push`. The site redeploys automatically.

## 12. Troubleshooting
- **Blank page / page looks unstyled:** you opened a different file. Open `index.html` itself. All CSS and JS are inside it.
- **404 on GitHub Pages:** confirm `index.html` is in the repo *root* (not inside a subfolder), Pages is set to `main` / root, and wait a couple of minutes. The filename must be exactly `index.html` (lowercase).
- **`py` / `npm` not recognized:** install Python/Node (section 3), then close and reopen PowerShell.
- **Port already in use:** use another port, e.g. `py -m http.server 8080` and open http://localhost:8080.
- **Edits not showing:** hard-refresh with **Ctrl + F5**.
- **Phone can't reach the PC:** same Wi-Fi? Firewall prompt allowed? Use the deployed link instead.
- **Emoji look different on some devices:** expected; they are drawn by the device.
- **Vercel shows 404:** make sure `index.html` is in the repo root and no Output Directory is set.
- **Routing:** the app has no URL routes; all screens live inside `index.html`, so there is nothing to configure for routing.

## 13. Optional automated check
```powershell
npm install
npm test
```
Runs 34 checks in a simulated browser (jsdom): screens, mood cards, 53+ surprises, repeat avoidance, riddle reveal, envelopes, garden, bubbles. It is not a real browser, so it does not check visuals or layout.
