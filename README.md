# Travels (MWNF Exhibition Trails)

Museum With No Frontiers' Exhibition Trails: the trails by country and by
theme, each with its itineraries, description and curators, and each
itinerary with its description and pictures. It replaces the Exhibition
Trails pages of legacy <https://travels.museumwnf.org>
(`travel_et_*.php`), page for page.

The site is its own product, on Explore's model: its pages, shell, menu and
footer are this repository's, on the data package `@museumwnf/travels-data`
(inventory-app `scripts/exporters/docs/travels-data-package.md`), with the
shared texts of viewer-i18n's `travels` bundle. It reads viewer-core and
viewer-layout's shared stylesheet, and nothing else of the platform.

| Where | What |
| --- | --- |
| `src/dataset.config.js` | the site's address |
| `src/routes.js` | its routes and whole declaration (`travelsConfig`) |
| `src/SiteShell.vue` | legacy's frame: header, menu, footer |
| `src/views/` | the pages: home, a country's or theme's trails, a trail, an itinerary |
| `src/components/` | the breadcrumbs and a trail's heading band |
| `src/composables/travels.js` | the records the pages read |
| `src/rules.js` | legacy's rules: which trails show, galleries, neighbours |
| `src/styles/travels.css` | the pages' styles; `theme/` holds the site's colours and assets |
| `tests/smoke.test.js` | the site against its published package |
| `tests/pages/` | the pages against a small fixture package (`vitest.pages.config.js`) |

Routes: `/`, `/trails` (`?country=` / `?project=`), `/trail/<id>`
(`?tab=desc|its|cur`), `/itinerary/<id>` (`?tab=des|vl`).

## Development

Node tooling runs in Docker:

```
docker compose run --rm dev npm ci
docker compose run --rm dev npm test
docker compose up
```

Epic: museumwithnofrontiers/inventory-app#2515, story #2543.
