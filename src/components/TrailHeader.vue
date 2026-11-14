<script setup>
// The band under the banner of a trail's and an itinerary's pages
// (`headingForInsideEx`, `exDetailsmenuListing`, `exDetails`): the trail's
// country and the breadcrumbs, the trail's title, subtitle and region, on
// an itinerary's page "ITINERARY <n>: <its title>"; beside them the trail's
// book under "Relevant MWNF Travel Book" — its cover, a link to the book's
// page on the Publications site in the page's language. `theme` draws the
// book's box in the project's colour, as legacy's itinerary page did.
import { computed } from 'vue'
import { useI18n } from '@museumwnf/viewer-core'
import Crumbs from './TravelsCrumbs.vue'
import { bookLink } from '../rules.js'

const props = defineProps({
  trail: { type: Object, required: true },
  text: { type: Object, default: () => ({}) },
  heading: { type: String, default: '' },
  crumbs: { type: Array, default: () => [] },
  itinerary: { type: Object, default: null },
  theme: { type: String, default: '' },
})
const { t, locale } = useI18n()

const href = computed(() => bookLink(props.trail, locale.value))
const cover = computed(() => props.trail.images?.[0]?.url ?? null)
</script>

<template>
  <div class="mwnf-travels-detail-band">
    <div class="mwnf-travels-detail-band__texts">
      <h1 class="mwnf-travels-detail-band__heading">{{ heading }}</h1>
      <Crumbs :crumbs="crumbs" />
      <div class="mwnf-travels-detail-band__lines">
        <div v-if="text.title" class="mwnf-travels-detail-band__line"><strong>{{ text.title }}</strong></div>
        <div v-if="text.extra?.subtitle" class="mwnf-travels-detail-band__line"><strong>{{ text.extra.subtitle }}</strong></div>
        <div v-if="text.extra?.region_territory" class="mwnf-travels-detail-band__line"><b>{{ t('travels.trail.region') }}:</b>&nbsp;<strong>{{ text.extra.region_territory }}</strong></div>
        <div v-if="itinerary" class="mwnf-travels-detail-band__line mwnf-travels-detail-band__itinerary">
          {{ t('travels.itinerary.label').toUpperCase() }}&nbsp;{{ itinerary.number }}:&nbsp;{{ itinerary.title }}
        </div>
      </div>
    </div>
    <div class="mwnf-travels-detail-band__book" :class="theme && `mwnf-travels-detail-band__book--${theme}`">
      <template v-if="cover">
        <a v-if="href" :href="href" target="_blank" rel="noopener"><img :src="cover" alt=""></a>
        <img v-else :src="cover" alt="">
      </template>
      <span class="mwnf-travels-detail-band__book-label">{{ t('travels.trail.travelBook') }}</span>
    </div>
  </div>
</template>
