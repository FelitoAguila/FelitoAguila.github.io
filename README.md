# felitoaguila.github.io

Personal website for **Felix Manuel Aguila Alonso** — Product Analytics Specialist.

Static site, no build step, no dependencies, no hosting cost. One HTML file
contains the markup, the CSS, and the JavaScript.

## Structure

```
index.html          the whole site: markup + inline CSS + inline JS
404.html            not-found page
robots.txt          crawler policy
sitemap.xml         single-URL sitemap
.nojekyll           serve files as-is, skip Jekyll processing
assets/
  felo-avatar.jpg   hero photo (640x640)
info/               gitignored scratch space (CV, old site, source photo)
```

## Design

Mirrors the layout language of [marcosfeole.com](https://marcosfeole.com):
sticky blurred top bar with hash-routed sections (one section visible at a
time), numbered section headers, a filterable timeline, cards, skill chips,
and a contact panel. The palette is the site's own: electric blue
(`--accent: #5b6cff`) on near-black, with a full light theme toggled from the
top bar and remembered in `localStorage`.

## Editing

Everything lives in `index.html`. Useful anchors:

- **Colors** — the `:root` block of tokens at the top of `<style>`, and the
  `:root[data-theme="light"]` block right after it. Change `--accent`,
  `--accent-deep`, and `--bg` to re-skin the whole site.
- **Hero** — search for `<div class="hero">`.
- **Experience / certifications / skills** — each is one `<section>`; the
  timeline entries are `<li data-type="…">` where `data-type` drives the
  All / Industry / Freelance filter.
- **Email address** — stored as `data-u="feloaguila"` and `data-d="gmail.com"`
  and joined on click, so the address is never present as plain text for
  scrapers to harvest.
- **Photo** — drop a square image at `assets/felo-avatar.jpg`. Roughly 640x640
  and under ~100 KB keeps the page fast.

## Local preview

No build, so any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying for free (GitHub Pages)

This repo is meant to be the content of `FelitoAquila/FelitoAguila.github.io`.
Because GitHub Pages serves whatever branch you point it at, there is nothing
to build and no Actions workflow to configure:

```bash
# back up whatever is live now (only needed once)
git checkout -b backup/old-site

# copy this site into the live repo
cp -R index.html 404.html robots.txt sitemap.xml .nojekyll assets ~/projects/FelitoAguila.github.io/
cd ~/projects/FelitoAquila.github.io
git add -A && git commit -m "New site"
git push origin master
```

In the repo's **Settings → Pages**, make sure **Deploy from a branch** is
selected with `master` / root. The site is then live at
<https://felitoaguila.github.io/> over HTTPS, at no cost.

The alternative, if you later want a CDN and a custom domain, is Cloudflare
Pages or GitHub Pages with a `CNAME` file. Both have free tiers.