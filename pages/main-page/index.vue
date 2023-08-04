<template>
  <main class="physics-main">
    <map-section/>
    <main-banner/>
    <about-section/>
    <speakers-section/>
    <program-section/>

    <register-banner/>
  </main>
</template>
<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import MainBanner from "./components/MainBanner.vue";
import AboutSection from "./components/AboutSection.vue";
import SpeakersSection from "./components/SpeakersSection.vue";
import ProgramSection from "./components/ProgramSection.vue";
import MapSection from "./components/MapSection.vue";
import RegisterBanner from "./components/RegisterBanner.vue";
@Component({
  components: {
    MainBanner,
    AboutSection,
    SpeakersSection,
    ProgramSection,
    MapSection,
    RegisterBanner
  }
})
export default class MainPage extends Vue{
  head() {
    return {
      script: [
        {
          src: `https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=<ваш API-ключ>`,
          type: `text/javascript`,
          id: 'yandex'
        },
      ],
      link: [
        {
          href: 'https://api-maps.yandex.ru',
          rel: 'preconnect'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./styles/index";
</style>
