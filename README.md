# The Joy of Lending — VA Home Loans Website

## Quick Start (Local Development)

```bash
npm install
npm run dev
```

This starts a local dev server at `http://localhost:5173`.

## Build for Production

```bash
npm run build
```

This creates a `dist/` folder with your production-ready static files.

## Deploy to Cloudflare Pages

### Option A: Cloudflare Dashboard (Easiest)

1. Run `npm run build` to generate the `dist/` folder
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
3. Click **Workers & Pages** in the left sidebar
4. Click **Create** → **Pages** → **Upload assets**
5. Name your project (e.g., `joyoflending`)
6. Drag and drop the **dist/** folder contents
7. Click **Deploy**
8. Your site is live at `joyoflending.pages.dev`

### Option B: Wrangler CLI (Faster for repeat deploys)

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy dist/ --project-name=joyoflending
```

### Connect Your Custom Domain

1. In Cloudflare dashboard → **Workers & Pages** → your project
2. Click **Custom domains** tab → **Set up a custom domain**
3. Enter your domain (e.g., `joyoflending.com`)
4. Cloudflare auto-configures DNS since the domain is already there

### Set Up Auto-Deploy from GitHub (Optional)

1. Push this project to a GitHub repo
2. In Cloudflare dashboard → **Workers & Pages** → **Create** → **Connect to Git**
3. Select your repo
4. Set build command: `npm run build`
5. Set build output directory: `dist`
6. Every push to `main` will auto-deploy

## Project Structure

```
joy-of-lending/
├── index.html          # Entry HTML (fonts loaded here)
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── CLAUDE.md           # Claude Code project guidelines
├── public/
│   └── favicon.svg     # Site favicon
└── src/
    ├── main.jsx        # React entry point
    ├── index.css       # Global styles and responsive breakpoints
    └── App.jsx         # Full site (home + location pages)
```
