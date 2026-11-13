import { travelsConfig } from '@museumwnf/viewer-layout/travels'

// The whole declaration of this website: the Exhibition Trails of legacy
// travels.museumwnf.org, whose pages, shell, menu and footer are
// viewer-layout's (`travelsConfig`, @museumwnf/viewer-layout/travels). What
// is this website's own is below: its data package and its address.

export default travelsConfig({
  // The dataset package this website renders. Must match the alias in
  // vite.config.js and the dependency in package.json.
  datasetPackage: '@museumwnf/travels-data',

  // The address this build is deployed at, base path included: the GitHub
  // Pages address, the same repository segment vite.config.js's `base` puts
  // in the build's base path, so the two change together, and with the domain.
  origin: 'https://museumwithnofrontiers.github.io/travels',
})
