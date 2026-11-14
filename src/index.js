// The Travels site's own pages: the Exhibition Trails of legacy
// travels.museumwnf.org (inventory-app#2515, #2543). They moved here from
// viewer-layout's ./travels entry, on Explore's model: the product lives in its
// own repository and reads only @museumwnf/viewer-core and viewer-layout's
// shared parts. dataset.config.js builds the site with 	ravelsConfig();
// the tests read the rest from here.

export { default as TravelsShell } from './SiteShell.vue'
export { default as TravelsHome } from './views/Home.vue'
export { default as TravelsTrails } from './views/Trails.vue'
export { default as TravelsTrail } from './views/Trail.vue'
export { default as TravelsItinerary } from './views/Itinerary.vue'
export { default as TravelsTrailHeader } from './components/TrailHeader.vue'
export { default as TravelsCrumbs } from './components/TravelsCrumbs.vue'
export { useTravels } from './composables/travels.js'
export { travelsConfig, travelsRoutes } from './routes.js'
export {
  bookLink, childrenOf, countryCode, galleryOf, HIDDEN_PROJECTS, inMenu, isListed, ITINERARY_TABS, MENU_HIDDEN_COUNTRIES, ITINERARY_TYPE, itineraryNumber,
  itineraryPicture, lines, LOCATION_TYPE, locationsOfTrail, mainLocations, neighbours, projectCode, projectOfTrail,
  TRAIL_TABS, TRAIL_TYPE, TRAVEL_ENTITIES, trailsOf,
} from './rules.js'
