# Cielle Candles · Media room

A responsive, statically generated press website for **media.ciellecandles.com**, built with Next.js App Router, TypeScript, and Tailwind CSS. This project is separate from the existing Cielle Candles storefront. No database, CMS, login, API keys, or environment variables are required.

## Run locally

Use Node.js 22 or 24 LTS and npm:

```sh
npm ci
npm run dev
```

Open port 3000 in your local browser. To verify the production export:

```sh
npm run build
npm run typecheck
python3 -m http.server 3000 --directory out
```

Stop the development server first if it uses port 3000. Production files are generated in `out/`; Vercel serves them directly. There is no Node.js server to maintain in production, and `next start` is not used with this static export.

## Tests

The browser suite checks all ten distinct download URLs and their file bytes, actual browser download behavior, approved copy, canonical and social metadata, social links, robots/sitemap, clipboard interactions, keyboard skip navigation, image loading, horizontal overflow, and automated WCAG A/AA checks at widths of 320, 390, 768, and 1440 pixels.

Install Chromium for Playwright once:

```sh
npx playwright install chromium
npm test
```

Python 3 must be available for the temporary static test server. If Chromium is already installed on the system, use its path instead of downloading another browser:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

`npm test` creates a fresh production build and then tests the export. Automated accessibility checks supplement manual review; they are not a certification of accessibility. Test screenshots are written to `/tmp/cielle-390.png` and `/tmp/cielle-1440.png` in this Linux environment.

## Content and maintenance

- `src/lib/brand.ts`: approved brand descriptions, founder biography, contact/social links, and download/portrait records.
- `src/app/page.tsx`: page sections and download links.
- `src/app/globals.css`: responsive layout and brand colors (ivory, warm rust, umber, and dark neutral).
- `src/app/layout.tsx`: SEO, canonical URL, Open Graph, Twitter preview, and favicon.
- `src/app/robots.ts` and `sitemap.ts`: statically generated indexing resources.
- `public/media/assets/`: unchanged supplied portraits, logos, social artwork, favicon, and reference images. Supplied WebP portraits are used for display; original PNGs are offered for download.
- `public/media/downloads/`: original PDFs, approved copy, brand guidelines, and the complete original media assets ZIP, renamed for a clear download URL.
- `vercel.json`: static output and response security headers.
- `tests/`: browser, download, metadata, and automated accessibility checks.

The supplied `Cielle_Candles_Media_Assets.zip` is the source of truth. Its 17 individual files and the complete ZIP were verified byte-for-byte after copying. Preserve approved logo proportions and colors. Portraits are AI-assisted wardrobe/background edits; the site includes the required editorial usage context. Confirm current products and availability on the storefront before adding claims.

To update assets, replace files under `public/media` with the newly approved originals, update copy and file-size labels as needed, then rebuild and test every download. Direct media links need no backend. The complete ZIP must also be refreshed when the source media package changes. Do not put private documents in `public/`.

## Deploy to Vercel

1. Commit the project and `package-lock.json` to the separate GitHub repository `jrdexterinc/media-cielle-candles`. Do not commit `node_modules`, `out`, `.next`, credentials, or `.vercel`.
2. In Vercel, create a **new project** importing that repository. Select Next.js, use Node.js 24 LTS, and keep the repository root as the project root. `vercel.json` supplies the `npm run build` command. Leave **Output Directory** at the framework default (turn off its override); do not set it to `out`. Vercel's Next.js integration reads the build metadata in `.next` and handles the static export automatically. The lockfile supports reproducible installation.
3. Review the preview deployment on desktop and mobile. Verify email/social links, PDF/PNG/TXT/ZIP downloads, and the supplied social preview image. Vercel preview deployments have platform indexing protection; confirm its current settings before sharing drafts.
4. In this new project's domain settings, add **media.ciellecandles.com**. Use the exact DNS record Vercel supplies for that subdomain.
5. Do not change the apex domain, `www`, storefront DNS records, or existing storefront Vercel project. No changes to the storefront are needed.
6. Once DNS and TLS are ready, verify the production URL, canonical metadata, social preview, `/robots.txt`, `/sitemap.xml`, and downloads. Publishing the site and DNS changes are separate from the local build.

If deploying to a different permanent domain, update metadata, robots, sitemap, and the corresponding test assertions. Keep the approved source artwork intact; request a revised social image from the brand if the domain printed in it changes.

## Validation and deployment status

If Vercel reports `NEXT_NO_ROUTES_MANIFEST` referencing `out/routes-manifest.json`, open **Settings → Build and Deployment → Output Directory**, disable the `out` override, and redeploy the latest commit. Keep the framework preset as Next.js. The local `out/` static export remains available for testing and other static hosts; it is not the Next.js build metadata directory.

The local production build, TypeScript checks, and all seven browser tests passed. The exact Facebook page URL was supplied by the brand owner. Vercel deployment and DNS configuration are separate publication steps and have not been performed.
