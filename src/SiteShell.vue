<script setup>
// Legacy travels.museumwnf.org's frame (header.include.php, footer.inc.php)
// for its Exhibition Trails: the dark red header with the MWNF logo, the top
// link bar, "MWNF Travel", the portal link and the language select; under it
// the rounded panel, its cream left column (each page fills it, see
// components/TravelsPage.vue). A project's trail list takes the project's
// colours, as legacy's `$themeSection` did (rules.js PROJECT_THEMES).
//
// The menu keeps Exhibition Trails (its themes and its countries) and MWNF
// Books. The tours, countries, booking and partners entries of legacy's top
// bar, and its whole left menu, belong to the 2013 offers, which are not
// rebuilt (inventory-app#2515), so they are not drawn. The footer under the
// frame is this site's own; legacy had none.
//
// `navigation.languages` is `languageLabels(languages)`; `travels.books`
// may name the Publications site's address (the trails' book links give it
// otherwise), `travels.portal` the portal's.
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { mwnfLinks, useI18n, useSiteConfig } from '@museumwnf/viewer-core'
import logo from '../theme/assets/legacy/logo.jpg'
import { useTravels } from './composables/travels.js'
import { inMenu, themeOf } from './rules.js'

const props = defineProps({
  languages: { type: Array, default: () => [] },
  language: { type: String, required: true },
})
const emit = defineEmits(['update:language'])

const { t } = useI18n()
const config = useSiteConfig()
const route = useRoute()
const data = useTravels()

const portal = computed(() => config.travels?.portal ?? mwnfLinks.portal)
// The Publications site, where the trails' books are.
const books = computed(() => {
  if (config.travels?.books) return config.travels.books
  const url = data.trails.value.find((trail) => trail.publications?.[0]?.url)?.publications[0].url
  return url ? url.slice(0, url.indexOf('#')) || url : 'https://books.museumwnf.org'
})

const countries = computed(() => [...new Set(data.listed.value.filter((trail) => inMenu(trail)).map((trail) => trail.country_id).filter(Boolean))]
  .map((id) => ({ id, name: data.countryName(id) }))
  .sort((a, b) => a.name.localeCompare(b.name)))
const year = new Date().getFullYear()

// A theme's list of trails is drawn in its project's colours.
const theme = computed(() => (route?.name === 'trails' && typeof route.query.project === 'string' ? themeOf(route.query.project) : ''))

const footerLinks = computed(() => [
  { text: t('core.footer.aboutMwnf'), href: mwnfLinks.about },
  { text: t('core.footer.contact'), href: mwnfLinks.contact },
  { text: t('core.footer.legalNotice'), href: mwnfLinks.legalNotice },
  { text: t('core.footer.credits'), href: mwnfLinks.credits },
  { text: t('core.footer.cookies'), href: mwnfLinks.cookies },
])
const multilingual = computed(() => props.languages.length > 1)
</script>

<template>
  <div class="mwnf-travels" :class="theme && `mwnf-travels--${theme}`">
    <header class="mwnf-travels-header">
      <a class="mwnf-travels-header__logo" :href="portal" :aria-label="t('travels.header.portal')"><img :src="logo" alt=""></a>
      <div class="mwnf-travels-header__centre">
        <nav class="mwnf-travels-menu" :aria-label="t('layout.nav.label')">
          <ul class="mwnf-travels-menu__list">
            <li class="mwnf-travels-menu__entry">
              <RouterLink :to="{ name: 'home' }">{{ t('travels.nav.exhibitionTrails') }}</RouterLink>
              <ul class="mwnf-travels-menu__children">
                <li v-for="project in data.projects.value" :key="project.code">
                  <RouterLink :to="{ name: 'trails', query: { project: project.code } }">{{ data.projectName(project.id) || project.code }}</RouterLink>
                </li>
                <li v-for="country in countries" :key="country.id">
                  <RouterLink :to="{ name: 'trails', query: { country: country.id } }">{{ country.name }}</RouterLink>
                </li>
              </ul>
            </li>
            <li class="mwnf-travels-menu__entry"><a :href="books">{{ t('travels.header.books') }}</a></li>
          </ul>
        </nav>
        <RouterLink class="mwnf-travels-header__title" :to="{ name: 'home' }" :title="t('travels.header.homeTip')">{{ t('travels.header.title') }}</RouterLink>
      </div>
      <div class="mwnf-travels-header__side">
        <a class="mwnf-travels-header__portal" :href="portal" :title="t('travels.header.portalTip')">{{ t('travels.header.portal') }}</a>
        <select
          v-if="multilingual"
          class="mwnf-travels-menu__language"
          :value="language"
          :aria-label="t('layout.language.label')"
          @change="emit('update:language', $event.target.value)"
        >
          <option v-for="option in languages" :key="option.code" :value="option.code">{{ option.label }}</option>
        </select>
      </div>
    </header>
    <div class="mwnf-travels-frame">
      <main class="mwnf-travels-main">
        <slot />
      </main>
    </div>
    <footer class="mwnf-travels-footer">
      <template v-for="link in footerLinks" :key="link.href">
        <a :href="link.href">{{ link.text }}</a>&nbsp;|&nbsp;
      </template>{{ t('core.footer.copyright') }} 2004–{{ year }}
    </footer>
  </div>
</template>
