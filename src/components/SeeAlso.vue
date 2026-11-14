<script setup>
// "See Also" in the left column of a trail's and an itinerary's pages
// (`seeAlsoCurver`): legacy's heading band, the page's tabs, each after its
// arrow, the current one in grey, and the column's curved foot. `theme` is
// the trail's project colour (rules.js themeOf). `tabs`: [{ key, label, tip,
// to, active }].
import { useI18n } from '@museumwnf/viewer-core'

defineProps({
  tabs: { type: Array, default: () => [] },
  theme: { type: String, default: '' },
})
const { t } = useI18n()
</script>

<template>
  <div class="mwnf-travels-see-also" :class="theme && `mwnf-travels-see-also--${theme}`">
    <div class="mwnf-travels-see-also__heading">{{ t('travels.trail.seeAlso') }}</div>
    <div class="mwnf-travels-see-also__tabs">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="mwnf-travels-see-also__tab"
        :class="{ 'mwnf-travels-see-also__tab--active': tab.active }"
      >
        <RouterLink :to="tab.to" :title="tab.tip || undefined" :aria-current="tab.active ? 'page' : undefined">{{ tab.label }}</RouterLink>
      </div>
    </div>
  </div>
</template>
