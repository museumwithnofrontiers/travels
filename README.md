# Travels (MWNF Exhibition Trails)

Museum With No Frontiers' Exhibition Trails: the trails by country and by
theme, each with its itineraries, description and curators, and each
itinerary with its description and pictures. It replaces the Exhibition
Trails pages of legacy <https://travels.museumwnf.org>
(`travel_et_*.php`), page for page.

The pages are `@museumwnf/viewer-layout/travels` (`travelsConfig` in
`src/dataset.config.js`), on the data package `@museumwnf/travels-data`
(inventory-app `scripts/exporters/docs/travels-data-package.md`), with the
shared texts of viewer-i18n's `travels` bundle. What is this website's own:
its address and legacy's page colour (`theme/overrides.css`).

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
