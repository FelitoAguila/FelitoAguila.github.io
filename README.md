# felitoaguila.github.io

Personal website for **Felix Manuel Aguila Alonso** — Data Engineer & Analytics.

Static site, no build step, no dependencies, no hosting cost. The main page is
a single HTML file containing the markup, the CSS, and the JavaScript.

## Structure

```
index.html                the whole site: markup + inline CSS + inline JS
404.html                  not-found page
robots.txt                crawler policy
sitemap.xml               single-URL sitemap
.nojekyll                 serve files as-is, skip Jekyll processing
.gitignore                ignores info/ and nothing else
Felix_..._CV.pdf          the public Résumé, linked from the hero
assets/
  felo-avatar.jpg         hero photo (640x640, ~64 KB)
info/                     gitignored scratch space (CV, old site, source photo)
```

## Design

A sticky, blurred top bar sits above hash-routed sections, one visible at a
time, so the page reads as a sequence of focused views rather than one long
scroll. Section headers are numbered, content is grouped into cards, and
skills render as chips with the strongest ones highlighted.

Experience is a filterable timeline. Entries carry a `data-type` of `industry`
or `freelance`, and the All / Industry / Freelance control filters them.

The palette is electric blue (`--accent: #5b6cff`) on near-black
(`--bg: #0a0b12`), with a light theme (`--bg: #f7f8fc`, `--accent: #4338ca`)
toggled from the top bar and remembered in `localStorage`.

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
- **Résumé** — `Felix_Manuel_Aguila_Alonso_CV.pdf` at the repo root, linked
  root-relative as `/Felix_Manuel_Aguila_Alonso_CV.pdf`. Serving is
  case-sensitive, so renaming or recasing that file silently breaks the hero
  button.
- **Your URL** — `https://felitoaguila.github.io/` is hardcoded in three
  places: `sitemap.xml`, `robots.txt`, and the JSON-LD `url` and `image`
  fields in `index.html`. Change the domain and all three need updating.

## Local preview

No build, so any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

GitHub Pages publishes this repo directly, so there is nothing to build and no
Actions workflow to configure. `master` is tracked to the `pages` remote, which
points at `FelitoAguila/FelitoAguila.github.io` — the only repo able to serve
the `felitoaguila.github.io` root domain, since GitHub allows one user site per
account.

A deploy is an ordinary push:

```bash
git add -A && git commit -m "describe the change" && git push
```

In that repo's **Settings → Pages**, *Deploy from a branch* must stay set to
`master` / `/ (root)`.

Three things worth knowing:

- **A push takes one to two minutes to go live.** Pages rebuilds from a fresh
  clone of the branch, so an HTTP check straight after pushing measures the
  *previous* deployment. `git ls-remote pages` reports repo state immediately;
  wait before testing over HTTP.
- **`git push --force` is not part of the workflow.** It was used once to
  replace the previous site's history. Ordinary commits fast-forward cleanly.
- **Test the Résumé link specifically** with
  `curl -I https://felitoaguila.github.io/Felix_Manuel_Aguila_Alonso_CV.pdf`
  and expect `200`. It is the one root-relative asset, so it is what breaks
  first if the Pages source is ever misconfigured.

The previous site is archived at
<https://github.com/FelitoAguila/old-personal-website>, including an unfinished
refactor on its `refactor/content-updates` branch.

### A custom domain later

GitHub Pages attaches a custom domain at no extra cost — only the registration
costs money. Cloudflare Pages is the main alternative and its hosting is free
too, but it does not hand you a free domain: Cloudflare Registrar sells a `.com`
at wholesale, roughly $10.46 a year for registration and renewal alike.

Bandwidth is a weak reason to move. GitHub Pages allows 100 GB a month softly,
about twenty times what a personal portfolio typically serves. Cloudflare Pages
does offer unlimited static bandwidth and a stronger CDN, so it is worth
revisiting if a domain gets bought regardless.

Two gotchas if you go that way. Add the domain in the Cloudflare Pages dashboard
*before* creating the DNS record — a `CNAME` pointed at the project without that
step never resolves and Cloudflare serves a `522`. And a subdomain is fine for
the Résumé link; what would break it is a path prefix such as a GitHub project
site.