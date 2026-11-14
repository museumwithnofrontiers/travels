<script setup>
// A page in legacy's rounded panel: the cream left column (`menuListing`,
// where legacy's left menu stood and a trail's or an itinerary's "See Also"
// sat under it) and the page's own column beside it.
</script>

<template>
  <div class="mwnf-travels-page">
    <aside class="mwnf-travels-page__aside"><slot name="aside" /></aside>
    <div class="mwnf-travels-page__main"><slot /></div>
  </div>
</template>
