import { describe, expect, it, vi } from 'vitest'
import { loadEntities, mergeMessages } from '@museumwnf/viewer-core'
import {
  checkOfferedLanguages, checkRoutes, checkSectionMeta, checkTextsRendered, mountSite,
} from '@museumwnf/viewer-core/testing'
import { catalogues as sharedTexts } from '@museumwnf/viewer-i18n/travels'
import { ITINERARY_TYPE, isListed, projectCode, trailsOf } from '@museumwnf/viewer-layout/travels'
import ownTexts from '../locales/en.json'
import config from '../src/dataset.config.js'

// The same two layers main.js assembles, in the same order: the shared bundle
// first, this website's own file last. Mounting without them would prove
// nothing about the chrome — every text would render as its own name.
const messages = mergeMessages(sharedTexts, { en: ownTexts })

// A trail legacy listed, and its first itinerary, from this website's package.
async function aTrail() {
  const [collections] = await loadEntities(['collections'])
  const trail = trailsOf(collections).find((t) => isListed(t))
  const itinerary = collections.find((c) => c.parent_id === trail.id && c.type === ITINERARY_TYPE)
  return { trail, itinerary }
}

// The pages are viewer-layout's (`travelsConfig`), tested there against its
// fixture package; this test proves they render against this website's own
// package, each on an application mounted on that page's address — as a
// visitor arrives from a link.
describe('website smoke test', () => {
  it('mounts the home page in legacy’s shell, with its country and theme selects', async () => {
    const { app, host } = await mountSite(config, messages)
    expect(host.querySelector('.vc-home')).toBeNull()
    expect(host.querySelector('.mwnf-travels-header')).not.toBeNull()
    await vi.waitFor(() => expect(host.querySelectorAll('.mwnf-travels-home__select').length).toBeGreaterThan(0), { timeout: 20000 })
    expect(host.querySelectorAll('.mwnf-travels-home__select option').length).toBeGreaterThan(2)
    app.unmount()
  }, 60000)

  it('lists a theme’s trails', async () => {
    const { trail } = await aTrail()
    const { app, host } = await mountSite(config, messages, `#/trails?project=${encodeURIComponent(projectCode(trail))}`)
    await vi.waitFor(() => expect(host.querySelector('.mwnf-travels-trails__row')).not.toBeNull(), { timeout: 20000 })
    app.unmount()
  }, 60000)

  it('draws a trail’s page, its itineraries first', async () => {
    const { trail } = await aTrail()
    const { app, host } = await mountSite(config, messages, `#/trail/${encodeURIComponent(trail.id)}`)
    await vi.waitFor(() => expect(host.querySelector('.mwnf-travels-itinerary-row')).not.toBeNull(), { timeout: 20000 })
    app.unmount()
  }, 60000)

  it('draws an itinerary’s page', async () => {
    const { itinerary } = await aTrail()
    const { app, host } = await mountSite(config, messages, `#/itinerary/${encodeURIComponent(itinerary.id)}`)
    await vi.waitFor(() => expect(host.querySelector('.mwnf-travels-content__prose')).not.toBeNull(), { timeout: 20000 })
    app.unmount()
  }, 60000)

  it('declares every route by name, and leaves the catch-all to the router', () => {
    expect(checkRoutes(config, { names: ['home', 'trails', 'trail', 'itinerary'] })).toEqual([])
  })

  it('declares the entities every route reads', () => {
    for (const route of config.extraViews) {
      expect(Array.isArray(route.meta?.entities), route.name).toBe(true)
    }
  })

  it('declares the section every route belongs to', () => {
    expect(checkSectionMeta(config)).toEqual([])
  })

  it('publishes no generic entity pages', () => {
    expect(config.features.entities).toEqual([])
  })

  // Legacy drew a trail's page in the trail's language: the site offers the
  // languages the package declares, where the trails carry them.
  it('offers the languages the package declares, where the trails carry them', () => {
    expect(checkOfferedLanguages(config, { entity: 'collections' })).toEqual([])
    expect(config.languages.length).toBeGreaterThan(0)
    const switcher = config.navigation.languages
    expect(switcher.map((l) => l.code)).toEqual(config.languages)
    expect(switcher.every((l) => Boolean(l.label))).toBe(true)
  })

  // The chrome is two layers, and either one failing is silent: a missing
  // entry renders as its own name rather than as an error.
  it('renders the shared texts', async () => {
    const { app, host } = await mountSite(config, messages)
    await vi.waitFor(() => expect(host.querySelector('.mwnf-travels-home')).not.toBeNull(), { timeout: 20000 })
    expect(checkTextsRendered(host, { namespaces: ['trails', 'travels', 'core', 'layout'] })).toEqual([])
    app.unmount()
  }, 60000)
})
