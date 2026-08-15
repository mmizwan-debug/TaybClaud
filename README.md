# Tayb Meals — Website

Production-ready static website for Tayb Meals (Dubai food delivery).

## Folder structure

```
/
├── index.html          # Main page (single page, anchor-linked sections)
├── menu.html            # Full weekly menu — Full Menu / North Indian toggle, day + meal tabs
├── css/
│   ├── style.css        # Main site styles
│   └── menu.css         # Menu page styles
├── js/
│   └── menu.js           # Menu page tab/toggle logic
├── images/               # Site images — SEE "Missing images" BELOW
├── robots.txt
├── sitemap.xml
└── README.md
```

## Menu page

`menu.html` shows every dish from your two source menus (Weekly Menu and
North Indian Menu), organized by day and meal:

- **Full Menu / North Indian Menu** toggle at the top
- **Day tabs** (Monday–Sunday)
- **Meal tabs** (Breakfast / Lunch / Dinner — Sunday only has Lunch/Dinner)
- Each dish shows its name, description, and menu code (e.g. `B01-M`)
- On Thursday and Friday, the North Indian view has no breakfast dishes,
  so it automatically shows a "South Indian favourites" note with the
  fallback dishes, matching your original PDF exactly.

All dish data is embedded directly in `menu.html` (no external file needed),
so it works offline too. The homepage's "View Weekly Menu" button and the
main nav now link here instead of the old Google Drive PDF.

## ⚠️ 2 images still missing

Most images are in — thanks! Still needed in `images/`:

| Filename            | Used for                                  |
|----------------------|--------------------------------------------|
| `menu-notebook.jpg`  | Trial plan section                         |
| `trial-bg.jpg`       | Background image behind the trial section  |

Note: `logo-secondary.png` (footer) is currently a duplicate of `logo.png`
as a placeholder — swap in your actual secondary logo when you have it.

## Tracking already installed

- **Meta Pixel** — ID `2105430750001737`, installed in `<head>` with base
  code + `PageView` event + `noscript` fallback.
- **Google Analytics (GA4)** — Measurement ID `G-TC0PL992N7`, installed
  with `gtag.js` in `<head>`.

## SEO already in place

- Title, meta description, meta keywords
- Open Graph tags (Facebook/LinkedIn preview)
- Twitter Card tags
- `schema.org` structured data (FoodEstablishment + FAQPage) for AI/rich search
- `robots.txt` and `sitemap.xml`
- Favicon reference (add the actual file — see table above)

## Deploy

### GitHub Pages
1. Push this folder's contents to a GitHub repo.
2. Repo Settings → Pages → Source: `main` branch, `/ (root)`.
3. Site goes live at `https://<username>.github.io/<repo>/`.

### Netlify
1. Drag and drop this folder into [app.netlify.com/drop](https://app.netlify.com/drop), or
2. Connect the GitHub repo → deploy (no build command needed, publish directory = `/`).

### Vercel
1. `vercel` CLI in this folder, or
2. Import the GitHub repo in the Vercel dashboard → Framework preset: "Other" → deploy.

No build step is required anywhere — this is plain HTML/CSS.

## Local preview

Just open `index.html` in a browser, or run a simple local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- Update `https://taybmeals.com/` in `index.html`, `sitemap.xml`, and
  `robots.txt` if the real domain differs.
- All external links (registration form, WhatsApp, menu-change form) were
  verified and use `target="_blank" rel="noopener noreferrer"` for security.
- Fonts (Inter, Poppins) load from Google Fonts CDN — works online; for a
  fully offline copy, download the font files and self-host.
